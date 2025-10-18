// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Importa nossa conexão
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001; // O back-end rodará aqui

// --- Middlewares ---
// Permite que o front-end (rodando em outra porta) acesse esta API
app.use(cors({ origin: 'http://localhost:5173' })); // ATENÇÃO: Mude a porta se o seu Vite rodar em outra.
// Permite que o Express leia JSON enviado no corpo (body) das requisições
app.use(express.json());

// --- Rotas ---

// Rota de Teste
app.get('/', (req, res) => {
  res.send('API do sistema de login está funcionando!');
});

/**
 * ROTA DE REGISTRO
 * POST /register
 * Recebe: { email, password }
 */
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  let conn;
  try {
    // 1. Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 2. Salvar no banco
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
    if (conn) conn.release(); // Libera a conexão de volta para o pool
  }
});

/**
 * ROTA DE LOGIN
 * POST /login
 * Recebe: { email, password }
 */
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    let conn;
    try {
        // 1. Buscar usuário pelo email
        conn = await pool.getConnection();
        const query = "SELECT * FROM users WHERE email = ?";
        const rows = await conn.query(query, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas.' }); // Usuário não encontrado
        }

        const user = rows[0];

        // 2. Comparar a senha enviada com o hash salvo
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Senha incorreta.' }); // Senha errada
        }

        // 3. Gerar o Token JWT
        const tokenPayload = { userId: user.id, email: user.email };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora

        res.json({ message: 'Login bem-sucedido!', token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    } finally {
        if (conn) conn.release();
    }
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🗣️ 🔥`);
});