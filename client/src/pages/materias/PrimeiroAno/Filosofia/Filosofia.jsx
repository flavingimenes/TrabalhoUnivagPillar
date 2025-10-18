import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; // Ajuste o caminho se necessário

// Dados da matéria de Filosofia
const dadosFilosofia = {
  area: "Ciências Humanas e Sociais Aplicadas",
  materia: "Filosofia",
  competencias: [
    "Desenvolver o pensamento crítico, autônomo e argumentativo, sendo capaz de analisar, conceituar e debater ideias.",
    "Questionar a realidade, as convenções sociais e os valores estabelecidos, elaborando reflexões éticas e políticas.",
    "Compreender e analisar diferentes perspectivas filosóficas, desenvolvendo uma visão de mundo própria e fundamentada."
  ],
  habilidades: [
    <p>
      <strong>O Nascimento da Filosofia:</strong> Compreensão da passagem do pensamento mítico ao pensamento racional (logos) na Grécia Antiga.
    </p>,
    <p>
      <strong>Introdução à Lógica e ao Pensamento Crítico:</strong> Estudo das estruturas básicas do argumento e identificação de falácias para aprimorar o raciocínio.
    </p>,
    <p>
      <strong>Teoria do Conhecimento:</strong> Reflexão sobre as origens, a natureza e os limites do conhecimento humano (o que é a verdade? como podemos conhecer?).
    </p>,
    <p>
      <strong>Ética e Moral:</strong> Discussão sobre valores, virtudes, liberdade e responsabilidade a partir do pensamento de filósofos como Sócrates, Platão e Aristóteles.
    </p>
  ],
};

const Filosofia = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/primeiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosFilosofia.area}</p>
        <h1>{dadosFilosofia.materia} - 1º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosFilosofia.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosFilosofia.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Filosofia;