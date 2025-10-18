import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; 

// Dados da matéria de Física para o 3º Ano
const dadosFisica3 = {
  area: "Ciências da Natureza e suas Tecnologias",
  materia: "Física",
  competencias: [
    "Interpretar e aplicar as leis do eletromagnetismo para compreender o funcionamento de dispositivos e tecnologias essenciais à vida moderna.",
    "Compreender as revoluções científicas do século XX e suas implicações tecnológicas e na nossa visão de universo."
  ],
  habilidades: [
    <p>
      <strong>Eletromagnetismo:</strong> Estudo aprofundado do campo magnético, força magnética, indução eletromagnética (Lei de Faraday) e suas aplicações em motores, geradores e transformadores.
    </p>,
    <p>
      <strong>Física Moderna:</strong> Introdução aos conceitos da física quântica (dualidade onda-partícula, efeito fotoelétrico, modelo atômico de Bohr) e da relatividade restrita (postulados de Einstein, dilatação do tempo, contração do espaço).
    </p>,
    <p>
      <strong>Análise de Circuitos Elétricos:</strong> Resolução de problemas envolvendo circuitos elétricos complexos, com geradores, receptores, capacitores e as Leis de Kirchhoff.
    </p>
  ],
};

const Fisica3 = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/terceiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosFisica3.area}</p>
        <h1>{dadosFisica3.materia} - 3º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosFisica3.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosFisica3.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Fisica3;