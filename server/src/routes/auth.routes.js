import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { PublicController } from '../controllers/PublicController.js';
import { authRequired } from '../middlewares/auth.js';

const r = Router();

// públicas (cadastro/login + opções de etapa/série)
r.get('/etapas', PublicController.etapas);
r.get('/etapas/:etapaId/series', PublicController.seriesByEtapa);
r.post('/register', AuthController.register);
r.post('/login',    AuthController.login);

// protegidas
r.get('/me', authRequired, AuthController.me);
r.put('/preferences', authRequired, AuthController.updatePreferences);

export default r;
