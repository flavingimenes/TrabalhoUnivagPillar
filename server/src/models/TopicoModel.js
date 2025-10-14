import pool from '../config/db.js';
import { disciplinaAllowed } from './DisciplinaModel.js';

//list Topicos By Disciplina
export async function listTopicosByDisciplina(serieId, disciplinaId) {
  if (!(await disciplinaAllowed(serieId, disciplinaId))) return null;

  const [rows] = await pool.query(
    `SELECT t.id AS topico_id, t.nome AS topico_nome,
            ce.id AS comp_id, ce.numero AS comp_numero, ce.descricao AS comp_desc
       FROM topico_elementar t
  LEFT JOIN topico_habilidade th ON th.topico_elementar_id = t.id
  LEFT JOIN habilidade h ON h.id = th.habilidade_id
  LEFT JOIN competencia_especifica ce ON ce.id = h.competencia_especifica_id
      WHERE t.disciplina_id = ?
      ORDER BY t.nome, ce.numero`,
    [disciplinaId]
  );
  // agrupa por tópico
  const map = {};
  for (const r of rows) {
    if (!map[r.topico_id]) map[r.topico_id] = { id: r.topico_id, nome: r.topico_nome, competencias: [] };
    if (r.comp_id && !map[r.topico_id].competencias.some(c => c.id === r.comp_id)) {
      map[r.topico_id].competencias.push({ id: r.comp_id, numero: r.comp_numero, descricao: r.comp_desc });
    }
  }
  return Object.values(map);
}

//topico Allowed
export async function topicoAllowed(serieId, topicoId) {
  const [[row]] = await pool.query(
    `SELECT d.id AS disciplina_id
       FROM topico_elementar t
       JOIN disciplina d ON d.id = t.disciplina_id
      WHERE t.id=?`, [topicoId]
  );
  if (!row) return false;
  return disciplinaAllowed(serieId, row.disciplina_id);
}

//get Comp Hab By Topico
export async function getCompHabByTopico(serieId, topicoId) {
  if (!(await topicoAllowed(serieId, topicoId))) return null;

  const [rows] = await pool.query(
    `SELECT ce.id AS comp_id, ce.numero AS comp_num, ce.descricao AS comp_desc,
            h.id AS hab_id, h.codigo AS hab_cod, h.descricao AS hab_desc
       FROM topico_elementar t
       JOIN topico_habilidade th ON th.topico_elementar_id = t.id
       JOIN habilidade h ON h.id = th.habilidade_id
       JOIN competencia_especifica ce ON ce.id = h.competencia_especifica_id
      WHERE t.id = ?
      ORDER BY ce.numero, h.codigo`,
    [topicoId]
  );
  const map = {};
  for (const r of rows) {
    if (!map[r.comp_id]) map[r.comp_id] = { id: r.comp_id, numero: r.comp_num, descricao: r.comp_desc, habilidades: [] };
    map[r.comp_id].habilidades.push({ id: r.hab_id, codigo: r.hab_cod, descricao: r.hab_desc });
  }
  return Object.values(map);
}

//get Meta Topico
export async function getMetaTopico(serieId, topicoId) {
  if (!(await topicoAllowed(serieId, topicoId))) return null;

  const [rows] = await pool.query(
    `SELECT t.id AS topico_id, t.nome AS topico_nome,
            d.id AS disc_id, d.nome AS disc_nome, d.sigla_bncc,
            a.id AS area_id, a.nome AS area_nome, a.sigla AS area_sigla,
            s.id AS serie_id, s.nome AS serie_nome
       FROM topico_elementar t
       JOIN disciplina d ON d.id = t.disciplina_id
       JOIN area_conhecimento a ON a.id = d.area_conhecimento_id
  LEFT JOIN serie_disciplina sd ON sd.disciplina_id = d.id
  LEFT JOIN serie s ON s.id = sd.serie_id
      WHERE t.id = ?`,
    [topicoId]
  );
  if (!rows.length) return null;
  const base = {
    topico: { id: rows[0].topico_id, nome: rows[0].topico_nome },
    disciplina: { id: rows[0].disc_id, nome: rows[0].disc_nome, sigla_bncc: rows[0].sigla_bncc },
    area: { id: rows[0].area_id, nome: rows[0].area_nome, sigla: rows[0].area_sigla },
    series: []
  };
  const set = new Set();
  for (const r of rows) if (r.serie_id && !set.has(r.serie_id)) { set.add(r.serie_id); base.series.push({ id: r.serie_id, nome: r.serie_nome }); }
  return base;
}
