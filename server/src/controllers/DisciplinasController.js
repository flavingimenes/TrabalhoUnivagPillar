import { listDisciplinasForSerie } from '../models/DisciplinaModel.js';

export const DisciplinasController = {
  listBySerie: async (req, res) => {
    if (Number(req.params.serieId) !== Number(req.ctx.serieId))
      return res.status(403).json({ error: 'Acesso negado à série' });

    const rows = await listDisciplinasForSerie(req.ctx.serieId);
    res.json(rows);
  }
};
