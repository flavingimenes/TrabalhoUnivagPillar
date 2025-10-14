import pool from '../config/db.js';

//has Matriz
async function hasMatriz(serieId) {
  const [[r]] = await pool.query(`SELECT COUNT(*) AS c FROM serie_disciplina WHERE serie_id=?`, [serieId]);
  return r.c > 0;
}

//list Disciplinas For Serie
export async function listDisciplinasForSerie(serieId) {
  if (await hasMatriz(serieId)) {
    const [rows] = await pool.query(
      `SELECT d.id, d.nome, d.sigla_bncc,
              a.nome AS area_nome, a.sigla AS area_sigla,
              s.nome AS serie_nome
         FROM serie_disciplina sd
         JOIN disciplina d ON d.id = sd.disciplina_id
         JOIN area_conhecimento a ON a.id = d.area_conhecimento_id
         JOIN serie s ON s.id = sd.serie_id
        WHERE sd.serie_id = ?
        ORDER BY a.nome, d.nome`,
      [serieId]
    );
    return rows;
  } else {
    const [rows] = await pool.query(
      `SELECT d.id, d.nome, d.sigla_bncc,
              a.nome AS area_nome, a.sigla AS area_sigla,
              (SELECT nome FROM serie WHERE id = ?) AS serie_nome
         FROM disciplina d
         JOIN area_conhecimento a ON a.id = d.area_conhecimento_id
        ORDER BY a.nome, d.nome`,
      [serieId]
    );
    return rows;
  }
}

//disciplinaAllowed
export async function disciplinaAllowed(serieId, disciplinaId) {
  const [[m]] = await pool.query(`SELECT COUNT(*) AS c FROM serie_disciplina WHERE serie_id=?`, [serieId]);
  if (m.c === 0) return true;
  const [[ok]] = await pool.query(
    `SELECT 1 FROM serie_disciplina WHERE serie_id=? AND disciplina_id=?`,
    [serieId, disciplinaId]
  );
  return !!ok;
}
