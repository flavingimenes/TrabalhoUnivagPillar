import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Biologia para o 2º Ano
const dadosBiologia2 = {
  area: "Ciências da Natureza e suas Tecnologias",
  materia: "Biologia",
  competencias: [
    "Analisar a evolução dos seres vivos e as interações biológicas para compreender a complexidade e a interdependência da vida, valorizando a biodiversidade.",
    "Compreender a importância da ciência e da tecnologia para a promoção da saúde humana, analisando criticamente os avanços científicos e seus impactos no indivíduo e na coletividade."
  ],
  habilidades: [
    <p>
      <strong>Diversidade dos Seres Vivos:</strong> Estudo comparativo da morfologia e fisiologia dos grandes reinos (Monera, Protista, Fungi, Plantae e Animalia), compreendendo suas relações filogenéticas e importância ecológica.
    </p>,
    <p>
      <strong>Fisiologia Humana e Comparada:</strong> Compreensão do funcionamento integrado dos sistemas do corpo humano (digestório, respiratório, circulatório, excretor, endócrino, nervoso), relacionando-os com a manutenção da homeostase e comparando-os com outros grupos de animais.
    </p>,
    <p>
      <strong>Biotecnologia e Bioética:</strong> Introdução aos conceitos e aplicações da biotecnologia (transgênicos, clonagem, terapia gênica) e discussão sobre suas implicações éticas, sociais e ambientais.
    </p>
  ],
};

const Biologia = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/segundoAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosBiologia2.area}</p>
        <h1>{dadosBiologia2.materia} - 2º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosBiologia2.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosBiologia2.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Biologia;