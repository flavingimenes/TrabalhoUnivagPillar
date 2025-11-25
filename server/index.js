require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Importa nossa conexão
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middlewares ---
app.use(cors({ 
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));

app.use(express.json());

// --- Rotas Existentes ---

app.get('/', (req, res) => {
  res.send('API do sistema de login está funcionando!');
});

app.get('/content/home', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = "SELECT section_key, content_text FROM site_content";
        const rows = await conn.query(query);

        const contentMap = {};
        rows.forEach(row => {
            contentMap[row.section_key] = row.content_text;
        });
        res.json(contentMap);
    } catch (error) {
        console.error("Erro ao buscar /content/home:", error);
        res.status(500).json({ error: 'Erro ao buscar conteúdo.' });
    } finally {
        if (conn) conn.release();
    }
});

// =======================================================
// ROTAS DO QUIZ 🧠
// =======================================================

// 1. GET: Pegar todas as matérias para o menu
app.get('/api/subjects', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = "SELECT * FROM subjects";
        const rows = await conn.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Erro ao buscar matérias:", error);
        res.status(500).json({ error: "Erro ao buscar matérias." });
    } finally {
        if (conn) conn.release();
    }
});

// 2. GET: Pegar perguntas por matéria
app.get('/api/quiz/:subjectId', async (req, res) => {
    const { subjectId } = req.params;
    let conn;
    try {
        conn = await pool.getConnection();
        const query = "SELECT * FROM questions WHERE subject_id = ?";
        const rows = await conn.query(query, [subjectId]);

        // Tratamento para garantir que o campo JSON 'options' seja retornado como Array
        const formattedResults = rows.map(q => ({
            ...q,
            options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options 
        }));

        res.json(formattedResults);
    } catch (error) {
        console.error("Erro ao buscar quiz:", error);
        res.status(500).json({ error: "Erro ao buscar quiz." });
    } finally {
        if (conn) conn.release();
    }
});

// =======================================================
// ROTAS DO CALENDÁRIO / PLANNER
// =======================================================

// 1. GET: Buscar anotações
app.get('/api/annotations', async (req, res) => {
    const userId = req.query.userId;
    let conn;
    try {
        conn = await pool.getConnection();
        // Nota: Se você implementar autenticação JWT depois, pegue o ID do req.user
        const rows = await conn.query("SELECT * FROM study_annotations WHERE user_id = ?", [userId]);
        res.json(rows);
    } catch (error) {
        console.error("Erro ao buscar anotações:", error);
        res.status(500).json({ error: "Erro ao buscar dados." });
    } finally {
        if (conn) conn.release();
    }
});

// 2. POST: Criar anotação
app.post('/api/annotations', async (req, res) => {
    const { user_id, title, annotation_date, start_time, end_time, subject_type } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const query = "INSERT INTO study_annotations (user_id, title, annotation_date, start_time, end_time, subject_type) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await conn.query(query, [user_id, title, annotation_date, start_time, end_time, subject_type]);
        
        // O driver MariaDB retorna insertId como BigInt, precisamos converter para Number para o JSON não quebrar
        res.json({ id: Number(result.insertId), ...req.body });
    } catch (error) {
        console.error("Erro ao criar anotação:", error);
        res.status(500).json({ error: "Erro ao salvar dados." });
    } finally {
        if (conn) conn.release();
    }
});

// 3. PUT: Atualizar anotação
app.put('/api/annotations/:id', async (req, res) => {
    const id = req.params.id;
    const { title, start_time, end_time, subject_type } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const query = "UPDATE study_annotations SET title = ?, start_time = ?, end_time = ?, subject_type = ? WHERE id = ?";
        await conn.query(query, [title, start_time, end_time, subject_type, id]);
        res.json({ message: "Atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar anotação:", error);
        res.status(500).json({ error: "Erro ao atualizar dados." });
    } finally {
        if (conn) conn.release();
    }
});

// 4. DELETE: Remover anotação
app.delete('/api/annotations/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query("DELETE FROM study_annotations WHERE id = ?", [id]);
        res.json({ message: "Deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar anotação:", error);
        res.status(500).json({ error: "Erro ao deletar dados." });
    } finally {
        if (conn) conn.release();
    }
});

// =======================================================
// ROTAS DE PERFIL DO USUÁRIO (NOVO) 👤
// =======================================================

// 1. GET: Buscar dados do usuário (Email e Foco)
app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        // Selecionamos apenas dados seguros, NUNCA retorne o hash da senha aqui
        const query = "SELECT id, email, academic_focus FROM users WHERE id = ?";
        const rows = await conn.query(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro interno ao buscar perfil." });
    } finally {
        if (conn) conn.release();
    }
});

// 2. PUT: Alterar senha
app.put('/api/user/change-password', async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ error: "Preencha todos os campos." });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        
        // 1. Buscar o hash da senha atual
        const checkQuery = "SELECT password_hash FROM users WHERE id = ?";
        const rows = await conn.query(checkQuery, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const user = rows[0];

        // 2. Verificar se a senha atual está correta
        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "A senha atual está incorreta." });
        }

        // 3. Hash da nova senha
        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(newPassword, salt);

        // 4. Atualizar no banco
        const updateQuery = "UPDATE users SET password_hash = ? WHERE id = ?";
        await conn.query(updateQuery, [newPasswordHash, userId]);

        res.json({ message: "Senha alterada com sucesso!" });

    } catch (error) {
        console.error("Erro ao alterar senha:", error);
        res.status(500).json({ error: "Erro ao atualizar senha." });
    } finally {
        if (conn) conn.release();
    }
});

// =======================================================
// ROTAS DE AUTENTICAÇÃO (EXISTENTES)
// =======================================================

app.post('/register', async (req, res) => {
  // ATUALIZAÇÃO 1: Recebendo o campo academicFocus
  const { email, password, academicFocus } = req.body;

  // ATUALIZAÇÃO 2: Validando o novo campo
  if (!email || !password || !academicFocus) {
    return res.status(400).json({ error: 'Todos os campos (email, senha e foco) são obrigatórios.' });
  }

  let conn;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    conn = await pool.getConnection();
    
    // ATUALIZAÇÃO 3: Inserindo na coluna academic_focus
    const query = "INSERT INTO users (email, password_hash, academic_focus) VALUES (?, ?, ?)";
    await conn.query(query, [email, passwordHash, academicFocus]);

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });

  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
       return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  } finally {
    if (conn) conn.release();
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const query = "SELECT * FROM users WHERE email = ?";
        const rows = await conn.query(query, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const secret = process.env.JWT_SECRET || 'fallback_secret';
        
        // Dica: Se quiser usar o academic_focus no front depois, adicione ele aqui no payload
        const tokenPayload = { 
            userId: user.id, 
            email: user.email,
            academicFocus: user.academic_focus 
        };
        const token = jwt.sign(tokenPayload, secret, { expiresIn: '1h' }); 

        // Retorna o ID e o Foco também para o front usar
        res.json({ 
            message: 'Login bem-sucedido!', 
            token: token, 
            userId: user.id,
            academicFocus: user.academic_focus 
        }); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    } finally {
        if (conn) conn.release();
    }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🗣️ 🔥`);
});