import jwt from 'jsonwebtoken';

export function authRequired(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Auth token requerido' });
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = { id: data.id, email: data.email };
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido/expirado' });
  }
}
