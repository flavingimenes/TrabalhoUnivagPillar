import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Filosofia para o 2º Ano
const dadosFilosofia2 = {
  area: "Ciências Humanas e Sociais Aplicadas",
  materia: "Filosofia",
  competencias: [
    "Articular diferentes saberes para a análise de problemas sociais e existenciais, utilizando a reflexão filosófica para aprofundar a compreensão da realidade.",
    "Desenvolver a capacidade de argumentação e contra-argumentação de forma rigorosa, analisando criticamente diferentes teorias e posições filosóficas para construir um pensamento autônomo."
  ],
  habilidades: [
    <p>
      <strong>Teoria do Conhecimento (Epistemologia):</strong> Análise do debate central da filosofia moderna entre o Racionalismo (Descartes) e o Empirismo (Locke, Hume), e a tentativa de síntese de Immanuel Kant.
    </p>,
    <p>
      <strong>Filosofia Política:</strong> Reflexão sobre os conceitos de política, justiça, liberdade e poder a partir do pensamento de filósofos clássicos (Platão, Aristóteles) e modernos, como os contratualistas (Hobbes, Locke, Rousseau) e Maquiavel.
    </p>,
    <p>
      <strong>Filosofia da Ciência:</strong> Discussão sobre o que define o conhecimento científico, o método científico e os debates sobre a neutralidade e os limites da ciência.
    </p>
  ],
};

const Filosofia = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/segundoAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosFilosofia2.area}</p>
        <h1>{dadosFilosofia2.materia} - 2º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosFilosofia2.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosFilosofia2.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Filosofia;