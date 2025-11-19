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

// --- Rotas ---

app.get('/', (req, res) => {
  res.send('API do sistema de login está funcionando!');
});

// =======================================================
// NOVA ROTA: BUSCAR CONTEÚDO DA HOME
// =======================================================
app.get('/content/home', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        
        // Tenta buscar os dados. Se a tabela não existir, vai dar erro aqui.
        const query = "SELECT section_key, content_text FROM site_content";
        const rows = await conn.query(query);

        // Transforma o Array do banco em um Objeto JSON simples
        // De: [{ section_key: 'titulo', content_text: 'Olá' }]
        // Para: { titulo: 'Olá' }
        const contentMap = {};
        rows.forEach(row => {
            contentMap[row.section_key] = row.content_text;
        });

        res.json(contentMap);

    } catch (error) {
        console.error("Erro ao buscar /content/home:", error);
        // Retorna erro 500 para o front saber que falhou
        res.status(500).json({ error: 'Erro ao buscar conteúdo. Verifique se a tabela site_content foi criada no banco.' });
    } finally {
        if (conn) conn.release();
    }
});

/**
 * ROTA DE REGISTRO
 */
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

/**
 * ROTA DE LOGIN
 */
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

        res.json({ message: 'Login bem-sucedido!', token: token });

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