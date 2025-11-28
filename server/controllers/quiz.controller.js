const pool = require('../db'); // Caminho para a pasta db

// Função auxiliar para embaralhar as alternativas (A, B, C, D)
function shuffleArray(array) {
    if (!Array.isArray(array)) return array;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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
        
        // --- ALTERAÇÃO AQUI: ADICIONADO "LIMIT 20" ---
        // Pega 20 questões aleatórias da matéria
        const rows = await conn.query("SELECT * FROM questions WHERE subject_id = ? ORDER BY RAND() LIMIT 20", [subjectId]);

        const formattedResults = rows.map(q => {
            let options = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
            return {
                ...q,
                options: shuffleArray(options) 
            };
        });

        res.json(formattedResults);
    } catch (error) {
        console.error("Erro ao buscar quiz:", error);
        res.status(500).json({ error: "Erro ao buscar quiz." });
    } finally {
        if (conn) conn.release();
    }
}

// --- FUNÇÃO COM CORREÇÃO DE FALLBACK (Permite repetição se acabar as inéditas) ---
async function generateReinforcement(req, res) {
    const { subjectId, topics, count, excludeIds } = req.body;

    if (!subjectId || !topics || topics.length === 0) {
        return res.status(400).json({ error: "Dados insuficientes para gerar reforço." });
    }

    let conn;
    try {
        conn = await pool.getConnection();

        // 1. Configurações básicas
        const placeholders = topics.map(() => '?').join(',');
        const limit = parseInt(count) || 5;

        // 2. Prepara cláusula de exclusão (para tentar achar perguntas NOVAS)
        let excludeClause = "";
        let excludePlaceholders = "";
        if (excludeIds && excludeIds.length > 0) {
             excludePlaceholders = excludeIds.map(() => '?').join(',');
             excludeClause = `AND id NOT IN (${excludePlaceholders})`;
        }

        // 3. TENTATIVA 1: Buscar apenas questões INÉDITAS
        const queryUnique = `
            SELECT * FROM questions 
            WHERE subject_id = ? 
            AND topic IN (${placeholders}) 
            ${excludeClause}
            ORDER BY RAND() 
            LIMIT ?
        `;

        let valuesUnique = [subjectId, ...topics];
        if (excludeIds && excludeIds.length > 0) {
            valuesUnique = [...valuesUnique, ...excludeIds];
        }
        valuesUnique.push(limit);

        let rows = await conn.query(queryUnique, valuesUnique);
        let actualRows = rows.meta ? rows.slice(0, rows.length) : rows;

        // --- CORREÇÃO (FALLBACK) ---
        // Se não achou nada (array vazio), significa que o aluno já viu todas as questões.
        // Então buscamos de novo, permitindo repetição.
        if (!actualRows || actualRows.length === 0) {
            console.log("Sem questões novas. Buscando questões repetidas para reforço...");
            
            const queryRepeat = `
                SELECT * FROM questions 
                WHERE subject_id = ? 
                AND topic IN (${placeholders}) 
                ORDER BY RAND() 
                LIMIT ?
            `;
            // Valores sem os IDs de exclusão
            const valuesRepeat = [subjectId, ...topics, limit];
            
            rows = await conn.query(queryRepeat, valuesRepeat);
            actualRows = rows.meta ? rows.slice(0, rows.length) : rows;
        }

        // Se AINDA assim for vazio, é porque não tem nenhuma questão desse tópico no banco
        if (!actualRows || actualRows.length === 0) {
            return res.json([]);
        }

        // 4. Formata e embaralha as alternativas
        const formattedResults = actualRows.map(q => {
            let options = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
            return {
                ...q,
                options: shuffleArray(options)
            };
        });

        res.json(formattedResults);

    } catch (error) {
        console.error("Erro ao gerar reforço:", error);
        res.status(500).json({ error: "Erro ao gerar atividades de reforço." });
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
    generateReinforcement,
    saveQuizResult,
    getQuizHistory
};