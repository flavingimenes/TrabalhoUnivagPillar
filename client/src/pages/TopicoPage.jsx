import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api';
import Tabs from '../components/Tabs';

export default function TopicoPage() {
  const nav = useNavigate();
  const { state } = useLocation();
  const { topico, disciplina, serie } = state || {};
  const [meta, setMeta] = useState(null);
  const [active, setActive] = useState('tab-1');

  useEffect(() => {
    if (!topico?.id) return;
    api.get(`/topicos/${topico.id}/meta`).then(({data}) => setMeta(data));
  }, [topico]);

  const tabs = useMemo(() => [{ key: 'tab-1', label: topico?.nome || 'Tópico' }], [topico]);

  if (!topico) return <div className="container py-4">Tópico não informado. Volte e selecione um tópico.</div>;

  const subTitle = () => {
    const d = disciplina?.nome || meta?.disciplina?.nome || '';
    const a = meta?.area?.nome || '';
    const s = serie?.nome || (meta?.series?.[0]?.nome || '');
    return `${d} - ${a} - ${s}`;
  };

  return (
    <div className="container py-4">
      <h3>{topico.nome}</h3>
      <Tabs tabs={tabs} activeKey={active} onSelect={setActive}>
        <div className="mb-2 text-muted">{subTitle()}</div>
        <div className="card">
          <div className="card-body">
            <h5>Conteúdo</h5>
            <p>
              {/* Aqui entra o conteúdo completo do tópico (estrutura livre). */}
              Em construção: corpo do tópico <strong>{topico.nome}</strong>.
            </p>
          </div>
          <div className="card-footer d-flex gap-2 justify-content-end">
            {/* Desafio: reservado para futuro */}
            {/* <button className="btn btn-outline-secondary">Desafio</button> */}
            <button className="btn btn-success" onClick={() => nav(-1)}>Concluir</button>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
