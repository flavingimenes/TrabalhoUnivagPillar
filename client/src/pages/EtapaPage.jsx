import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import Tabs from '../components/Tabs';
import CardGrid from '../components/CardGrid';
import { slugify } from '../utils/slugify';

export default function EtapaPage() {
  const nav = useNavigate();
  const { etapaSlug } = useParams();
  const [etapas, setEtapas] = useState([]);
  const [series, setSeries] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    api.get('/etapas').then(({data}) => {
      setEtapas(data);
      const chosen = data.find(e => slugify(e.nome) === etapaSlug) || data[0];
      setActive(chosen?.id);
    });
  }, [etapaSlug]);

  useEffect(() => {
    if (!active) return;
    api.get(`/etapas/${active}/series`).then(({data}) => setSeries(data));
  }, [active]);

  const tabs = useMemo(() => etapas.map(e => ({
    key: e.id, label: e.nome
  })), [etapas]);

  return (
    <div className="container py-4">
      <h3>Etapas de ensino</h3>
      <Tabs tabs={tabs} activeKey={active} onSelect={setActive}>
        <CardGrid
          items={series.map(s => ({ ...s, key: s.id }))}
          renderTitle={(s) => s.nome}
          renderSubtitle={(s) => s.etapa_nome}
          renderFooter={(s) => (
            <button className="btn btn-primary" onClick={() => nav(`/serie/${slugify(s.nome)}`, { state: { serie: s } })}>
              Acessar
            </button>
          )}
        />
      </Tabs>
    </div>
  );
}
