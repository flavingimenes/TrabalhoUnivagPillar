import pool from '../config/db.js';

//list Series By Etapa
export async function listSeriesByEtapa(etapaId) {
  const [rows] = await pool.query(
    `SELECT id, nome, ordinal FROM serie WHERE etapa_ensino_id=? ORDER BY ordinal`, [etapaId]
  );
  return rows;
}

//get Serie Basic
export async function getSerieBasic(serieId) {
  const [[r]] = await pool.query(
    `SELECT s.id, s.nome, s.ordinal, e.nome AS etapa_nome, e.id AS etapa_id
       FROM serie s JOIN etapa_ensino e ON e.id=s.etapa_ensino_id
      WHERE s.id=?`, [serieId]
  );
  return r || null;
}
