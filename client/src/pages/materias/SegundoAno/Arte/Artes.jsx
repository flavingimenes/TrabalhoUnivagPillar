import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Arte para o 2º Ano
const dadosArtes2 = {
  area: "Linguagens e suas Tecnologias",
  materia: "Artes",
  competencias: [
    "Utilizar as diferentes linguagens artísticas de forma criativa e crítica, experimentando a hibridização entre elas (ex: teatro com projeções de vídeo) para expressar ideias e problematizar questões do presente.",
    "Compreender o papel da arte na construção de identidades individuais e coletivas, analisando como as produções artísticas podem afirmar, questionar ou transformar memórias e narrativas sociais."
  ],
  habilidades: [
    <p>
      <strong>Investigação da Arte Moderna e Contemporânea:</strong> Pesquisa e análise da produção artística a partir do século XX, incluindo as vanguardas europeias (Cubismo, Surrealismo, etc.), o Modernismo no Brasil (Semana de 22, Antropofagia) e as manifestações da arte contemporânea (instalação, performance, arte conceitual), compreendendo suas rupturas e críticas.
    </p>,
    <p>
      <strong>Projetos Artísticos, Tecnologia e Cultura Digital:</strong> Criação de projetos que dialoguem com as tecnologias digitais, explorando linguagens como a fotografia digital, o vídeo, a videoarte e a arte em rede. A habilidade inclui refletir sobre o impacto da cultura digital nos processos de criação e fruição da arte.
    </p>
  ],
};

const Artes = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/segundoAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosArtes2.area}</p>
        <h1>{dadosArtes2.materia} - 2º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosArtes2.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosArtes2.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Artes;