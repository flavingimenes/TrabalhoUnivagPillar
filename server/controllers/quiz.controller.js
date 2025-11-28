const pool = require('../db'); // Caminho para a pasta db

async function getSubjects(req, res) {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM subjects");
        res.json(rows);
    } catch (error) {
        console.error("Erro ao buscar matérias:", error);
        res.status(500).json({ error: "Erro ao buscar matérias." });
    } finally {
        if (conn) conn.release();
    }
}

async function getQuestionsBySubject(req, res) {
    const { subjectId } = req.params;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM questions WHERE subject_id = ?", [subjectId]);

        // Faz o parse das opções caso estejam salvas como string JSON
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
}

async function saveQuizResult(req, res) {
    const { userId, subjectId, score, totalQuestions } = req.body;

    if (!userId || !subjectId || score === undefined || !totalQuestions) {
        return res.status(400).json({ error: "Faltam dados para guardar o resultado." });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const percentage = (score / totalQuestions) * 100;

        const query = `
      INSERT INTO quiz_results (user_id, subject_id, score, total_questions, percentage) 
      VALUES (?, ?, ?, ?, ?)
    `;
        await conn.query(query, [userId, subjectId, score, totalQuestions, percentage]);

        res.status(201).json({ message: "Resultado guardado com sucesso!" });
    } catch (error) {
        console.error("Erro ao guardar resultado:", error);
        res.status(500).json({ error: "Erro ao guardar resultado no banco." });
    } finally {
        if (conn) conn.release();
    }
}

async function getQuizHistory(req, res) {
    const { userId } = req.params;
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `
      SELECT qr.*, s.name as subject_name 
      FROM quiz_results qr
      LEFT JOIN subjects s ON qr.subject_id = s.id
      WHERE qr.user_id = ?
      ORDER BY qr.created_at DESC
    `;
        const rows = await conn.query(query, [userId]);
        res.json(rows);
    } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        res.status(500).json({ error: "Erro ao buscar histórico." });
    } finally {
        if (conn) conn.release();
    }
}

module.exports = {
    getSubjects,
    getQuestionsBySubject,
    saveQuizResult,
    getQuizHistory
};