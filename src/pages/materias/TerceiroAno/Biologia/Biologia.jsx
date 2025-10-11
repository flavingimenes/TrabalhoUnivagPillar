import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Biologia para o 3º Ano
const dadosBiologia3 = {
  area: "Ciências da Natureza e suas Tecnologias",
  materia: "Biologia",
  competencias: [
    "Avaliar, com base em conhecimentos científicos, propostas de intervenção em âmbitos local e global, considerando os impactos ambientais, sociais e econômicos.",
    "Compreender e aplicar conceitos de evolução e ecologia para analisar a dinâmica da vida e as relações entre os seres vivos e o ambiente."
  ],
  habilidades: [
    <p>
      <strong>Evolução:</strong> Análise aprofundada das teorias evolutivas (Lamarckismo, Darwinismo, Neodarwinismo), evidências da evolução, mecanismos de especiação e a origem da vida.
    </p>,
    <p>
      <strong>Genética Molecular e Biotecnologia:</strong> Estudo da estrutura do DNA e RNA, síntese proteica e mutações. Aprofundamento em engenharia genética, transgênicos, clonagem, terapia gênica e suas implicações.
    </p>,
    <p>
      <strong>Ecologia Aplicada e Saúde Pública:</strong> Análise dos principais problemas ambientais globais (efeito estufa, desmatamento, perda de biodiversidade) e noções de saúde pública, epidemiologia e imunologia (vacinas e soros).
    </p>
  ],
};

const Biologia3 = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/terceiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosBiologia3.area}</p>
        <h1>{dadosBiologia3.materia} - 3º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosBiologia3.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosBiologia3.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Biologia3;