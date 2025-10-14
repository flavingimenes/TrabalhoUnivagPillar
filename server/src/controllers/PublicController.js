import { listAllEtapas } from '../models/EtapaModel.js';
import { listSeriesByEtapa } from '../models/SerieModel.js';

export const PublicController = {
  etapas: async (_req, res) => res.json(await listAllEtapas()),
  seriesByEtapa: async (req, res) => res.json(await listSeriesByEtapa(req.params.etapaId)),
};
