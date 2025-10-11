import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; 

// Dados da matéria de História para o 2º Ano
const dadosHistoria2 = {
  area: "Ciências Humanas e Sociais Aplicadas",
  materia: "História",
  competencias: [
    "Analisar as relações de poder entre nações e grupos sociais no passado e no presente, compreendendo as origens históricas das desigualdades e conflitos contemporâneos.",
    "Compreender as dinâmicas sociais e as transformações históricas no Brasil, relacionando os processos de formação do Estado e da sociedade brasileira com os desafios atuais."
  ],
  habilidades: [
    <p>
      <strong>Século XIX e Imperialismo:</strong> Análise da Segunda Revolução Industrial, do Neocolonialismo na África e na Ásia, e das ideologias que o justificaram.
    </p>,
    <p>
      <strong>História do Brasil (Império e República Velha):</strong> Aprofundamento no processo de independência, Primeiro e Segundo Reinado, crise da monarquia, escravidão e abolição. Estudo da Proclamação da República e das estruturas da República Velha (coronelismo, política do café com leite).
    </p>,
    <p>
      <strong>O Período Entreguerras e a Segunda Guerra Mundial:</strong> Análise da Crise de 1929, da ascensão de regimes totalitários (nazifascismo, stalinismo) e do desenrolar da Segunda Guerra Mundial e suas consequências.
    </p>
  ],
};

const Historia = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/segundoAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosHistoria2.area}</p>
        <h1>{dadosHistoria2.materia} - 2º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosHistoria2.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosHistoria2.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Historia;