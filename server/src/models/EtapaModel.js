import pool from '../config/db.js';

//list All Etapas
export async function listAllEtapas() {
  const [rows] = await pool.query(`SELECT id, nome, sigla FROM etapa_ensino ORDER BY nome`);
  return rows;
}

//get Etapa By Id
export async function getEtapaById(id) {
  const [[r]] = await pool.query(`SELECT id, nome, sigla FROM etapa_ensino WHERE id=?`, [id]);
  return r || null;
}
