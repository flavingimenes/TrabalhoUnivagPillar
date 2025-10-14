import { getSerieBasic } from '../models/SerieModel.js';

export const SeriesController = {
  listMineByEtapa: async (req, res) => {
    if (Number(req.params.etapaId) !== Number(req.ctx.etapaId))
      return res.status(403).json({ error: 'Acesso negado à etapa' });

    const s = await getSerieBasic(req.ctx.serieId);
    if (!s) return res.json([]);
    res.json([{ id: s.id, nome: s.nome, ordinal: s.ordinal, etapa_nome: s.etapa_nome }]);
  }
};
