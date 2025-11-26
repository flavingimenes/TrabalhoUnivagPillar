const pool = require('../db');
const { hashPassword, comparePassword } = require('../utils/password.util');
const { signToken } = require('../utils/jwt.util');

async function register(req, res) {
    const { email, password, academicFocus } = req.body;

    if (!email || !password || !academicFocus) {
        return res.status(400).json({ error: 'Todos os campos (email, senha e foco) são obrigatórios.' });
    }

    let conn;
    try {
        const passwordHash = await hashPassword(password);
        conn = await pool.getConnection();
        const query = "INSERT INTO users (email, password_hash, academic_focus) VALUES (?, ?, ?)";
        await conn.query(query, [email, passwordHash, academicFocus]);
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error(error);
        if (error && error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Este e-mail já está em uso.' });
        }
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    } finally {
        if (conn) conn.release();
    }
}

async function login(req, res) {
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
        const isMatch = await comparePassword(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const tokenPayload = {
            userId: user.id,
            email: user.email,
            academicFocus: user.academic_focus
        };
        const token = signToken(tokenPayload, '1h');

        res.json({
            message: 'Login bem-sucedido!',
            token,
            userId: user.id,
            academicFocus: user.academic_focus
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    } finally {
        if (conn) conn.release();
    }
}

module.exports = { register, login };
