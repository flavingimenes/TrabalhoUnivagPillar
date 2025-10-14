import { getEtapaById } from '../models/EtapaModel.js';

export const EtapasController = {
  listMine: async (req, res) => {
    const etapa = await getEtapaById(req.ctx.etapaId);
    res.json(etapa ? [etapa] : []);
  }
};
