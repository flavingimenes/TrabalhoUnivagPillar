import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api';
import Tabs from '../components/Tabs';
import CardGrid from '../components/CardGrid';
import Modal from '../components/Modal';
import { slugify } from '../utils/slugify';

export default function DisciplinaPage() {
  const nav = useNavigate();
  const { state } = useLocation();
  const { disciplina, serie } = state || {};
  const [topicos, setTopicos] = useState([]);
  const [active, setActive] = useState('tab-1');
  const [showSobre, setShowSobre] = useState(false);
  const [sobreData, setSobreData] = useState(null);
  const [sobreTitle, setSobreTitle] = useState('');

  useEffect(() => {
    if (!disciplina?.id) return;
    api.get(`/disciplinas/${disciplina.id}/topicos`).then(({data}) => setTopicos(data));
  }, [disciplina]);

  const openSobre = async (t) => {
    const { data } = await api.get(`/topicos/${t.id}/competencias_habilidades`);
    setSobreData(data);
    setSobreTitle(t.nome);
    setShowSobre(true);
  };

  const tabs = useMemo(() => [{ key: 'tab-1', label: disciplina?.nome || 'Disciplina' }], [disciplina]);

  if (!disciplina) return <div className="container py-4">Disciplina não informada. Volte e selecione uma disciplina.</div>;

  return (
    <div className="container py-4">
      <h3>{disciplina.nome}</h3>
      <Tabs tabs={tabs} activeKey={active} onSelect={setActive}>
        <CardGrid
          items={topicos.map(t => ({ ...t, key: t.id }))}
          renderTitle={(t) => t.nome}
          renderSubtitle={() => `${disciplina.nome} - ${serie?.nome || ''}`}
          renderFooter={(t) => (
            <>
              <button className="btn btn-outline-secondary" onClick={() => openSobre(t)}>Sobre</button>
              <button className="btn btn-primary"
                onClick={() => nav(`/topico/${slugify(t.nome)}`, { state: { topico: t, disciplina, serie } })}>
                Acessar
              </button>
            </>
          )}
        />
      </Tabs>

      <Modal show={showSobre} title={`Competências e habilidades — ${sobreTitle}`} onClose={() => setShowSobre(false)}>
        {!sobreData ? (
          <div>Carregando...</div>
        ) : (
          <div className="accordion" id="accComp">
            {sobreData.map((c, idx) => (
              <div className="accordion-item" key={c.id}>
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse"
                          data-bs-target={`#c-${idx}`} aria-expanded="true"
                          aria-controls={`c-${idx}`}>
                    C{c.numero} — {c.descricao}
                  </button>
                </h2>
                <div id={`c-${idx}`} className="accordion-collapse collapse show">
                  <div className="accordion-body">
                    <ul className="mb-0">
                      {c.habilidades.map(h => <li key={h.id}><strong>{h.codigo}:</strong> {h.descricao}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
