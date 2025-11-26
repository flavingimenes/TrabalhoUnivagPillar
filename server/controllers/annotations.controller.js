const pool = require('../db');

async function getAnnotations(req, res) {
    const userId = req.query.userId;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM study_annotations WHERE user_id = ?", [userId]);
        res.json(rows);
    } catch (error) {
        console.error("Erro ao buscar anotações:", error);
        res.status(500).json({ error: "Erro ao buscar dados." });
    } finally {
        if (conn) conn.release();
    }
}

async function createAnnotation(req, res) {
    const { user_id, title, annotation_date, start_time, end_time, subject_type } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const query = "INSERT INTO study_annotations (user_id, title, annotation_date, start_time, end_time, subject_type) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await conn.query(query, [user_id, title, annotation_date, start_time, end_time, subject_type]);
        res.json({ id: Number(result.insertId), ...req.body });
    } catch (error) {
        console.error("Erro ao criar anotação:", error);
        res.status(500).json({ error: "Erro ao salvar dados." });
    } finally {
        if (conn) conn.release();
    }
}

async function updateAnnotation(req, res) {
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
}

async function deleteAnnotation(req, res) {
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
}

module.exports = {
    getAnnotations,
    createAnnotation,
    updateAnnotation,
    deleteAnnotation
};
