import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

app.get('/health', (_req,res)=>res.json({ok:true}));
app.use('/', routes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API ON http://localhost:${port}`));
