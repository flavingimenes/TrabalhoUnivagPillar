import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Educação Física para o 2º Ano
const dadosEducacaoFisica2 = {
  area: "Linguagens e suas Tecnologias",
  materia: "Educação Física",
  competencias: [
    "Relacionar as práticas corporais com a promoção da saúde e da qualidade de vida, desenvolvendo autonomia para a criação de programas de exercícios e a crítica aos padrões de corpo e desempenho impostos pela sociedade.",
    "Compreender a dimensão cultural e social do esporte e das práticas corporais, analisando-os como espaços de inclusão e exclusão, de manifestação de identidades e de relações de poder."
  ],
  habilidades: [
    <p>
      <strong>Análise Crítica do Esporte-Espetáculo:</strong> Análise crítica do esporte de alto rendimento e sua midiatização, discutindo temas como comercialização, violência, doping e o papel do esporte como fenômeno cultural e de massa.
    </p>,
    <p>
      <strong>Práticas Corporais de Aventura e na Natureza:</strong> Vivência e planejamento de práticas corporais de aventura urbanas (skate, parkour) e na natureza (trilhas, corridas de orientação), discutindo as noções de risco, segurança e a relação entre corpo e meio ambiente.
    </p>,
    <p>
      <strong>Aprofundamento em Ginástica, Dança e Lutas:</strong> Prática e análise de sistemas de ginástica (condicionamento físico, conscientização corporal), diferentes estilos de dança (salão, contemporânea) e modalidades de lutas, com foco em seus aspectos culturais, filosóficos e técnicos.
    </p>
  ],
};

const EducFisica = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/segundoAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosEducacaoFisica2.area}</p>
        <h1>{dadosEducacaoFisica2.materia} - 2º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosEducacaoFisica2.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosEducacaoFisica2.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default EducFisica;