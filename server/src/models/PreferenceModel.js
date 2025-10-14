import pool from '../config/db.js';

//serie Belongs To Etapa
export async function serieBelongsToEtapa(serieId, etapaId) {
  const [[r]] = await pool.query(`SELECT 1 FROM serie WHERE id=? AND etapa_ensino_id=?`, [serieId, etapaId]);
  return !!r;
}

//set Preference
export async function setPreference(userId, etapaId, serieId) {
  await pool.query(
    `REPLACE INTO usuario_preferencia (user_id, etapa_ensino_id, serie_id) VALUES (?,?,?)`,
    [userId, etapaId, serieId]
  );
}

//get Preference
export async function getPreference(userId) {
  const [[pref]] = await pool.query(
    `SELECT e.id AS etapa_id, e.nome AS etapa_nome, e.sigla AS etapa_sigla,
            s.id AS serie_id, s.nome AS serie_nome, s.ordinal
       FROM usuario_preferencia up
       JOIN etapa_ensino e ON e.id = up.etapa_ensino_id
       JOIN serie s ON s.id = up.serie_id
      WHERE up.user_id=?`,
    [userId]
  );
  return pref || null;
}

//get Ctx
export async function getCtx(userId) {
  const [[row]] = await pool.query(
    `SELECT etapa_ensino_id AS etapaId, serie_id AS serieId
       FROM usuario_preferencia WHERE user_id=?`, [userId]
  );
  return row || null;
}
