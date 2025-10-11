import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Língua Portuguesa para o 3º Ano
const dadosPortugues3 = {
  area: "Linguagens e suas Tecnologias",
  materia: "Língua Portuguesa",
  competencias: [
    "Mobilizar práticas de linguagem para participar de forma crítica e criativa nas diversas esferas da atividade humana, posicionando-se de maneira ética e fundamentada.",
    "Analisar o funcionamento das linguagens para interpretar e produzir criticamente discursos em textos de diversas semioses (visuais, sonoras, verbais)."
  ],
  habilidades: [
    <p>
      <strong>Literatura Contemporânea e Revisão:</strong> Análise de tendências da literatura brasileira pós-Modernismo até a contemporaneidade (concretismo, poesia marginal, prosa urbana). Revisão consolidada das escolas literárias, focando na intertextualidade e na preparação para vestibulares.
    </p>,
    <p>
      <strong>Aprofundamento da Argumentação:</strong> Domínio da estrutura dissertativo-argumentativa, com ênfase na construção de repertório sociocultural diversificado e na elaboração de propostas de intervenção detalhadas e articuladas com os direitos humanos.
    </p>,
    <p>
      <strong>Análise Crítica do Discurso Midiático:</strong> Análise de gêneros da esfera digital (podcasts, vídeos-minuto, threads), identificando estratégias de persuasão, vieses ideológicos e o fenômeno da desinformação (fake news).
    </p>
  ],
};

const Portugues3 = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/terceiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosPortugues3.area}</p>
        <h1>{dadosPortugues3.materia} - 3º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosPortugues3.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosPortugues3.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Portugues3;