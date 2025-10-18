import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de História para o 3º Ano
const dadosHistoria3 = {
  area: "Ciências Humanas e Sociais Aplicadas",
  materia: "História",
  competencias: [
    "Analisar e contextualizar as dinâmicas políticas, sociais e econômicas do mundo contemporâneo, identificando suas múltiplas causas e consequências.",
    "Utilizar o conhecimento histórico para construir uma identidade cidadã, respeitando a diversidade e posicionando-se criticamente diante dos desafios do presente."
  ],
  habilidades: [
    <p>
      <strong>Brasil Contemporâneo:</strong> Análise do período da Ditadura Militar, o processo de redemocratização, os governos da Nova República e os desafios sociais, políticos e econômicos do Brasil no século XXI.
    </p>,
    <p>
      <strong>Nova Ordem Mundial e Geopolítica:</strong> Estudo do mundo pós-Guerra Fria, a globalização, a ascensão de novas potências, os conflitos contemporâneos (Oriente Médio, terrorismo) e a formação de blocos econômicos.
    </p>,
    <p>
      <strong>História do Tempo Presente e Memória:</strong> Análise de acontecimentos recentes e o papel da memória e do esquecimento na construção da identidade social e do debate público.
    </p>
  ],
};

const Historia3 = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/terceiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosHistoria3.area}</p>
        <h1>{dadosHistoria3.materia} - 3º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosHistoria3.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosHistoria3.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Historia3;