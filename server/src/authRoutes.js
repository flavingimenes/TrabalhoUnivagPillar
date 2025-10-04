import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './db.js';
import { authRequired } from './middleware/auth.js';

const r = Router();

// Opções públicas (para tela de cadastro)
r.get('/etapas', async (_, res) => {
  const [rows] = await pool.query(`SELECT id, nome, sigla FROM etapa_ensino ORDER BY nome`);
  res.json(rows);
});
r.get('/etapas/:etapaId/series', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT id, nome, ordinal FROM serie WHERE etapa_ensino_id=? ORDER BY ordinal`,
    [req.params.etapaId]
  );
  res.json(rows);
});

// Cadastro
r.post('/register', async (req, res) => {
  const { nome, email, password, etapa_ensino_id, serie_id } = req.body || {};
  if (!nome || !email || !password || !etapa_ensino_id || !serie_id) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, email, password, etapa_ensino_id, serie_id' });
  }

  // Valida relação série ↔ etapa
  const [okSerie] = await pool.query(
    `SELECT 1 FROM serie WHERE id=? AND etapa_ensino_id=?`,
    [serie_id, etapa_ensino_id]
  );
  if (!okSerie.length) return res.status(400).json({ error: 'Série não pertence à etapa escolhida' });

  // Cria usuário
  const hash = await bcrypt.hash(password, 10);
  try {
    const [u] = await pool.query(
      `INSERT INTO usuario (nome, email, senha_hash) VALUES (?,?,?)`,
      [nome, email.toLowerCase(), hash]
    );
    await pool.query(
      `INSERT INTO usuario_preferencia (user_id, etapa_ensino_id, serie_id) VALUES (?,?,?)`,
      [u.insertId, etapa_ensino_id, serie_id]
    );

    const token = jwt.sign({ id: u.insertId, email: email.toLowerCase() }, process.env.JWT_SECRET || 'dev-secret', {
      expiresIn: process.env.JWT_EXPIRES || '7d'
    });

    // Retorna também as preferências resolvidas
    const [[pref]] = await pool.query(
      `SELECT e.id AS etapa_id, e.nome AS etapa_nome, e.sigla AS etapa_sigla,
              s.id AS serie_id, s.nome AS serie_nome, s.ordinal
       FROM usuario_preferencia up
       JOIN etapa_ensino e ON e.id = up.etapa_ensino_id
       JOIN serie s ON s.id = up.serie_id
       WHERE up.user_id=?`, [u.insertId]
    );

    res.status(201).json({
      token,
      user: { id: u.insertId, nome, email: email.toLowerCase() },
      pref
    });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email já cadastrado' });
    console.error(e);
    res.status(500).json({ error: 'Erro ao cadastrar' });
  }
});

// Login
r.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Informe email e password' });

  const [[u]] = await pool.query(`SELECT * FROM usuario WHERE email=?`, [email.toLowerCase()]);
  if (!u) return res.status(401).json({ error: 'Credenciais inválidas' });

  const ok = await bcrypt.compare(password, u.senha_hash);
  if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = jwt.sign({ id: u.id, email: u.email }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: process.env.JWT_EXPIRES || '7d'
  });

  const [[pref]] = await pool.query(
    `SELECT e.id AS etapa_id, e.nome AS etapa_nome, e.sigla AS etapa_sigla,
            s.id AS serie_id, s.nome AS serie_nome, s.ordinal
     FROM usuario_preferencia up
     JOIN etapa_ensino e ON e.id = up.etapa_ensino_id
     JOIN serie s ON s.id = up.serie_id
     WHERE up.user_id=?`, [u.id]
  );

  res.json({ token, user: { id: u.id, nome: u.nome, email: u.email }, pref });
});

// Perfil (protegido)
r.get('/me', authRequired, async (req, res) => {
  const [[u]] = await pool.query(`SELECT id, nome, email FROM usuario WHERE id=?`, [req.user.id]);
  const [[pref]] = await pool.query(
    `SELECT e.id AS etapa_id, e.nome AS etapa_nome, e.sigla AS etapa_sigla,
            s.id AS serie_id, s.nome AS serie_nome, s.ordinal
     FROM usuario_preferencia up
     JOIN etapa_ensino e ON e.id = up.etapa_ensino_id
     JOIN serie s ON s.id = up.serie_id
     WHERE up.user_id=?`, [req.user.id]
  );
  res.json({ user: u, pref });
});

// Atualizar preferências (protegido)
r.put('/preferences', authRequired, async (req, res) => {
  const { etapa_ensino_id, serie_id } = req.body || {};
  if (!etapa_ensino_id || !serie_id) return res.status(400).json({ error: 'Informe etapa_ensino_id e serie_id' });

  const [okSerie] = await pool.query(
    `SELECT 1 FROM serie WHERE id=? AND etapa_ensino_id=?`,
    [serie_id, etapa_ensino_id]
  );
  if (!okSerie.length) return res.status(400).json({ error: 'Série não pertence à etapa escolhida' });

  await pool.query(
    `REPLACE INTO usuario_preferencia (user_id, etapa_ensino_id, serie_id) VALUES (?,?,?)`,
    [req.user.id, etapa_ensino_id, serie_id]
  );

  res.json({ ok: true });
});

export default r;
