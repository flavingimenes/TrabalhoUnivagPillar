const pool = require('../db');

async function getHomeContent(req, res) {
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
}

module.exports = { getHomeContent };
