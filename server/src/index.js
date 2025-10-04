import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes.js';
import authRoutes from './authRoutes.js';
import { authRequired } from './middleware/auth.js';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

// rotas públicas de autenticação / opções
app.use('/auth', authRoutes);

// rotas protegidas
app.use('/api', authRequired, routes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API ON http://localhost:${port}`));
