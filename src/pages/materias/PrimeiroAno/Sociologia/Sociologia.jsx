import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; // Ajuste o caminho se necessário

// Dados da matéria de Sociologia
const dadosSociologia = {
  area: "Ciências Humanas e Sociais Aplicadas",
  materia: "Sociologia",
  competencias: [
    "Analisar a realidade social a partir de conceitos e teorias sociológicas, desnaturalizando visões do senso comum sobre a sociedade.",
    "Desenvolver uma postura crítica e reflexiva em relação às desigualdades sociais, aos preconceitos e às diversas formas de violência.",
    "Compreender o ser humano como ser social, capaz de agir e transformar a sociedade em que vive."
  ],
  habilidades: [
    <p>
      <strong>O Surgimento da Sociologia:</strong> Compreender o contexto histórico e social que levou ao surgimento da Sociologia como ciência.
    </p>,
    <p>
      <strong>Indivíduo e Sociedade:</strong> Análise das relações entre o indivíduo e as estruturas sociais, introduzindo o conceito de socialização.
    </p>,
    <p>
      <strong>Instituições Sociais:</strong> Compreensão do papel de instituições como a família, a escola, o Estado e o trabalho na organização da vida social.
    </p>,
    <p>
      <strong>Introdução aos Pensadores Clássicos:</strong> Apresentação das ideias iniciais de Émile Durkheim (fato social), Max Weber (ação social) e Karl Marx (classes sociais).
    </p>
  ],
};

const Sociologia = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/primeiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosSociologia.area}</p>
        <h1>{dadosSociologia.materia} - 1º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosSociologia.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosSociologia.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Sociologia;