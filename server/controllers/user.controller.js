const pool = require('../db');
const { comparePassword, hashPassword } = require('../utils/password.util');

async function getUserProfile(req, res) {
    const userId = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
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
}

async function changePassword(req, res) {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ error: "Preencha todos os campos." });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const checkQuery = "SELECT password_hash FROM users WHERE id = ?";
        const rows = await conn.query(checkQuery, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const user = rows[0];
        const isMatch = await comparePassword(currentPassword, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "A senha atual está incorreta." });
        }

        const newPasswordHash = await hashPassword(newPassword);
        const updateQuery = "UPDATE users SET password_hash = ? WHERE id = ?";
        await conn.query(updateQuery, [newPasswordHash, userId]);

        res.json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
        console.error("Erro ao alterar senha:", error);
        res.status(500).json({ error: "Erro ao atualizar senha." });
    } finally {
        if (conn) conn.release();
    }
}

module.exports = { getUserProfile, changePassword };
