import { listTopicosByDisciplina, getCompHabByTopico, getMetaTopico } from '../models/TopicoModel.js';

export const TopicosController = {
  listByDisciplina: async (req, res) => {
    const data = await listTopicosByDisciplina(req.ctx.serieId, Number(req.params.disciplinaId));
    if (!data) return res.status(403).json({ error: 'Disciplina fora da sua série' });
    res.json(data);
  },
  compHab: async (req, res) => {
    const data = await getCompHabByTopico(req.ctx.serieId, Number(req.params.topicoId));
    if (!data) return res.status(403).json({ error: 'Tópico fora da sua série' });
    res.json(data);
  },
  meta: async (req, res) => {
    const data = await getMetaTopico(req.ctx.serieId, Number(req.params.topicoId));
    if (!data) return res.status(403).json({ error: 'Tópico fora da sua série' });
    res.json(data);
  }
};
