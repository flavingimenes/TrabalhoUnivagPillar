import { Router } from 'express';
import authRoutes from './auth.routes.js';
import apiRoutes from './api.routes.js';

const r = Router();
r.use('/auth', authRoutes);
r.use('/api',  apiRoutes);
export default r;
