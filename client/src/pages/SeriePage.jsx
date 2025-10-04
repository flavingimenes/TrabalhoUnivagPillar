import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api';
import Tabs from '../components/Tabs';
import CardGrid from '../components/CardGrid';
import { slugify } from '../utils/slugify';

export default function SeriePage() {
  const nav = useNavigate();
  const { state } = useLocation();
  const [disciplinas, setDisciplinas] = useState([]);
  const [active, setActive] = useState('tab-1');

  const serie = state?.serie;
  useEffect(() => {
    if (!serie?.id) return;
    api.get(`/series/${serie.id}/disciplinas`).then(({data}) => setDisciplinas(data));
  }, [serie]);

  const tabs = useMemo(() => [{ key: 'tab-1', label: serie?.nome || 'Série' }], [serie]);

  if (!serie) return <div className="container py-4">Série não informada. Volte e selecione uma série.</div>;

  return (
    <div className="container py-4">
      <h3>{serie.nome}</h3>
      <Tabs tabs={tabs} activeKey={active} onSelect={setActive}>
        <CardGrid
          items={disciplinas.map(d => ({ ...d, key: d.id }))}
          renderTitle={(d) => d.nome}
          renderSubtitle={(d) => `${d.area_nome} - ${serie.nome}`}
          renderFooter={(d) => (
            <button className="btn btn-primary"
              onClick={() => nav(`/disciplina/${slugify(d.nome)}`, { state: { disciplina: d, serie } })}>
              Acessar
            </button>
          )}
        />
      </Tabs>
    </div>
  );
}
