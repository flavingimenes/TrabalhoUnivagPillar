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
// ROTAS DO CALENDÁRIO / PLANNER (NOVAS)
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
// ROTAS DE AUTENTICAÇÃO (EXISTENTES)
// =======================================================

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  let conn;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    conn = await pool.getConnection();
    const query = "INSERT INTO users (email, password_hash) VALUES (?, ?)";
    await conn.query(query, [email, passwordHash]);

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
        const tokenPayload = { userId: user.id, email: user.email };
        const token = jwt.sign(tokenPayload, secret, { expiresIn: '1h' }); 

        res.json({ message: 'Login bem-sucedido!', token: token, userId: user.id }); // Retorna o ID também para o front usar

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