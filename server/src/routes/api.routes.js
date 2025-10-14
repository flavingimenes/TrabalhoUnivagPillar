import { Router } from 'express';
import { authRequired } from '../middlewares/auth.js';
import { AuthController } from '../controllers/AuthController.js';
import { EtapasController } from '../controllers/EtapasController.js';
import { SeriesController } from '../controllers/SeriesController.js';
import { DisciplinasController } from '../controllers/DisciplinasController.js';
import { TopicosController } from '../controllers/TopicosController.js';

const r = Router();

// tudo protegido + injeta ctx (etapaId/serieId)
r.use(authRequired, AuthController.ctx);

// etapas/series do usuário
r.get('/etapas', (req,res)=>EtapasController.listMine(req,res));
r.get('/etapas/:etapaId/series', (req,res)=>SeriesController.listMineByEtapa(req,res));

// disciplinas/tópicos
r.get('/series/:serieId/disciplinas', (req,res)=>DisciplinasController.listBySerie(req,res));
r.get('/disciplinas/:disciplinaId/topicos', (req,res)=>TopicosController.listByDisciplina(req,res));
r.get('/topicos/:topicoId/competencias_habilidades', (req,res)=>TopicosController.compHab(req,res));
r.get('/topicos/:topicoId/meta', (req,res)=>TopicosController.meta(req,res));

export default r;
