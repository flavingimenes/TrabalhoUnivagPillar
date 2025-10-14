import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByEmail, createUser, getUserById } from '../models/UserModel.js';
import { serieBelongsToEtapa, setPreference, getPreference, getCtx } from '../models/PreferenceModel.js';

function sign(u) {
  return jwt.sign({ id: u.id, email: u.email }, process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: process.env.JWT_EXPIRES || '7d' });
}

export const AuthController = {
  register: async (req, res) => {
    const { nome, email, password, etapa_ensino_id, serie_id } = req.body || {};
    if (!nome || !email || !password || !etapa_ensino_id || !serie_id)
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });

    if (!(await serieBelongsToEtapa(serie_id, etapa_ensino_id)))
      return res.status(400).json({ error: 'Série não pertence à etapa' });

    if (await findByEmail(email)) return res.status(409).json({ error: 'Email já cadastrado' });

    const senhaHash = await bcrypt.hash(password, 10);
    const user = await createUser({ nome, email, senhaHash });
    await setPreference(user.id, etapa_ensino_id, serie_id);
    const token = sign(user);
    const pref = await getPreference(user.id);
    res.status(201).json({ token, user, pref });
  },

  login: async (req, res) => {
    const { email, password } = req.body || {};
    const u = await findByEmail(email || '');
    if (!u) return res.status(401).json({ error: 'Credenciais inválidas' });

    const ok = await bcrypt.compare(password || '', u.senha_hash);
    if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = sign({ id: u.id, email: u.email });
    const pref = await getPreference(u.id);
    res.json({ token, user: { id: u.id, nome: u.nome, email: u.email }, pref });
  },

  me: async (req, res) => {
    const user = await getUserById(req.user.id);
    const pref = await getPreference(req.user.id);
    res.json({ user, pref });
  },

  updatePreferences: async (req, res) => {
    const { etapa_ensino_id, serie_id } = req.body || {};
    if (!(await serieBelongsToEtapa(serie_id, etapa_ensino_id)))
      return res.status(400).json({ error: 'Série não pertence à etapa' });

    await setPreference(req.user.id, etapa_ensino_id, serie_id);
    res.json({ ok: true });
  },

  ctx: async (req, res, next) => {
    const ctx = await getCtx(req.user.id);
    if (!ctx) return res.status(403).json({ error: 'Usuário sem preferência' });
    req.ctx = ctx;
    next();
  }
};
