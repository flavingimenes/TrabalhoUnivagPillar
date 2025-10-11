import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; // Ajuste o caminho se necessário

// Dados da matéria de História
const dadosHistoria = {
  area: "Ciências Humanas e Sociais Aplicadas",
  materia: "História",
  competencias: [
    "Analisar processos políticos, econômicos, sociais, ambientais e culturais em diferentes tempos e espaços, a partir da análise de fontes variadas.",
    "Compreender a diversidade cultural e a formação das sociedades, reconhecendo as relações de poder e as lógicas de inclusão e exclusão.",
    "Interpretar as transformações sociais, culturais e políticas, posicionando-se de forma crítica e ética diante dos desafios contemporâneos."
  ],
  habilidades: [
    <p>
      <strong>Introdução aos Estudos Históricos:</strong> Compreensão do que é a História, o trabalho do historiador e a análise de diferentes fontes históricas.
    </p>,
    <p>
      <strong>Antiguidade Clássica:</strong> Análise do legado cultural, político e social da Grécia e de Roma para o mundo ocidental (democracia, filosofia, direito).
    </p>,
    <p>
      <strong>Período Medieval:</strong> Estudo da formação e consolidação do feudalismo na Europa, o poder da Igreja Católica e as relações de suserania e vassalagem.
    </p>,
    <p>
      <strong>Formação do Mundo Moderno:</strong> Análise dos processos de formação dos Estados Nacionais Modernos, o absolutismo monárquico, o Renascimento cultural e científico e as Reformas Religiosas.
    </p>
  ],
};

const Historia = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/primeiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosHistoria.area}</p>
        <h1>{dadosHistoria.materia} - 1º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosHistoria.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosHistoria.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Historia;