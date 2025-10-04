import { Router } from 'express';
import pool from './db.js';

const r = Router();

// helper: carrega contexto (etapa/série do usuário)
async function getUserCtx(userId) {
  const [[row]] = await pool.query(
    `SELECT up.etapa_ensino_id AS etapaId, up.serie_id AS serieId
     FROM usuario_preferencia up WHERE up.user_id=?`, [userId]
  );
  if (!row) throw new Error('Usuário sem preferência configurada');
  return row;
}

// Middleware de contexto por requisição
r.use(async (req, res, next) => {
  try {
    req.ctx = await getUserCtx(req.user.id);
    next();
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }
});

// 1) Etapas (retorna só a etapa do usuário)
r.get('/etapas', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT id, sigla, nome FROM etapa_ensino WHERE id=?`, [req.ctx.etapaId]
  );
  res.json(rows);
});

// 2) Séries (retorna só a série do usuário, se a etapa casar)
r.get('/etapas/:etapaId/series', async (req, res) => {
  if (Number(req.params.etapaId) !== Number(req.ctx.etapaId))
    return res.status(403).json({ error: 'Acesso negado à etapa' });

  const [rows] = await pool.query(
    `SELECT s.id, s.ordinal, s.nome, e.nome AS etapa_nome
     FROM serie s
     JOIN etapa_ensino e ON e.id = s.etapa_ensino_id
     WHERE s.id=?`, [req.ctx.serieId]
  );
  res.json(rows);
});

// 3) Disciplinas por série (só da série do usuário)
r.get('/series/:serieId/disciplinas', async (req, res) => {
  if (Number(req.params.serieId) !== Number(req.ctx.serieId))
    return res.status(403).json({ error: 'Acesso negado à série' });

  const [hasMap] = await pool.query(
    `SELECT COUNT(*) AS c FROM serie_disciplina WHERE serie_id=?`, [req.ctx.serieId]
  );

  let rows;
  if (hasMap[0].c > 0) {
    [rows] = await pool.query(
      `SELECT d.id, d.nome, d.sigla_bncc,
              a.nome AS area_nome, a.sigla AS area_sigla,
              s.nome AS serie_nome
       FROM serie_disciplina sd
       JOIN disciplina d ON d.id = sd.disciplina_id
       JOIN area_conhecimento a ON a.id = d.area_conhecimento_id
       JOIN serie s ON s.id = sd.serie_id
       WHERE sd.serie_id = ?
       ORDER BY a.nome, d.nome`,
      [req.ctx.serieId]
    );
  } else {
    [rows] = await pool.query(
      `SELECT d.id, d.nome, d.sigla_bncc,
              a.nome AS area_nome, a.sigla AS area_sigla,
              (SELECT nome FROM serie WHERE id = ?) AS serie_nome
       FROM disciplina d
       JOIN area_conhecimento a ON a.id = d.area_conhecimento_id
       ORDER BY a.nome, d.nome`,
      [req.ctx.serieId]
    );
  }
  res.json(rows);
});

// helper: disciplina acessível pela série?
async function disciplinaAllowed(serieId, disciplinaId) {
  const [[m]] = await pool.query(
    `SELECT COUNT(*) AS c FROM serie_disciplina WHERE serie_id=?`, [serieId]
  );
  if (m.c === 0) return true; // sem matriz → libera todas

  const [[ok]] = await pool.query(
    `SELECT 1 FROM serie_disciplina WHERE serie_id=? AND disciplina_id=?`,
    [serieId, disciplinaId]
  );
  return !!ok;
}

// 4) Tópicos por disciplina (verifica se a disciplina é acessível)
r.get('/disciplinas/:disciplinaId/topicos', async (req, res) => {
  const disciplinaId = Number(req.params.disciplinaId);
  if (!(await disciplinaAllowed(req.ctx.serieId, disciplinaId)))
    return res.status(403).json({ error: 'Disciplina fora da sua série' });

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

  const byTopico = {};
  for (const row of rows) {
    if (!byTopico[row.topico_id]) {
      byTopico[row.topico_id] = { id: row.topico_id, nome: row.topico_nome, competencias: [] };
    }
    if (row.comp_id && !byTopico[row.topico_id].competencias.some(c => c.id === row.comp_id)) {
      byTopico[row.topico_id].competencias.push({
        id: row.comp_id, numero: row.comp_numero, descricao: row.comp_desc
      });
    }
  }
  res.json(Object.values(byTopico));
});

// helper: tópico acessível (pela disciplina ↔ série)
async function topicoAllowed(serieId, topicoId) {
  const [[row]] = await pool.query(
    `SELECT d.id AS disciplina_id
       FROM topico_elementar t
       JOIN disciplina d ON d.id = t.disciplina_id
      WHERE t.id=?`, [topicoId]
  );
  if (!row) return false;
  return disciplinaAllowed(serieId, row.disciplina_id);
}

// 5) Competências + habilidades do tópico
r.get('/topicos/:topicoId/competencias_habilidades', async (req, res) => {
  const topicoId = Number(req.params.topicoId);
  if (!(await topicoAllowed(req.ctx.serieId, topicoId)))
    return res.status(403).json({ error: 'Tópico fora da sua série' });

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

  const byComp = {};
  for (const row of rows) {
    if (!byComp[row.comp_id]) {
      byComp[row.comp_id] = { id: row.comp_id, numero: row.comp_num, descricao: row.comp_desc, habilidades: [] };
    }
    byComp[row.comp_id].habilidades.push({ id: row.hab_id, codigo: row.hab_cod, descricao: row.hab_desc });
  }
  res.json(Object.values(byComp));
});

// 6) Metadados do tópico
r.get('/topicos/:topicoId/meta', async (req, res) => {
  const topicoId = Number(req.params.topicoId);
  if (!(await topicoAllowed(req.ctx.serieId, topicoId)))
    return res.status(403).json({ error: 'Tópico fora da sua série' });

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
  if (!rows.length) return res.status(404).json({ error: 'Tópico não encontrado' });

  const base = {
    topico: { id: rows[0].topico_id, nome: rows[0].topico_nome },
    disciplina: { id: rows[0].disc_id, nome: rows[0].disc_nome, sigla_bncc: rows[0].sigla_bncc },
    area: { id: rows[0].area_id, nome: rows[0].area_nome, sigla: rows[0].area_sigla },
    series: []
  };
  const set = new Set();
  for (const r of rows) {
    if (r.serie_id && !set.has(r.serie_id)) {
      set.add(r.serie_id);
      base.series.push({ id: r.serie_id, nome: r.serie_nome });
    }
  }
  res.json(base);
});

export default r;
