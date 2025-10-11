import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; 

// Dados da matéria de Arte para o 3º Ano
const dadosArtes3 = {
  area: "Linguagens e suas Tecnologias",
  materia: "Artes",
  competencias: [
    "Compreender e analisar criticamente as manifestações do patrimônio cultural, em suas dimensões material e imaterial, como forma de construção de identidades e memórias.",
    "Participar de processos de produção individual e colaborativa em diferentes linguagens artísticas, desenvolvendo a autonomia, a crítica e a criatividade."
  ],
  habilidades: [
    <p>
      <strong>Arte e Ativismo:</strong> Investigação de como as linguagens artísticas são utilizadas em manifestações sociais e políticas. Análise de obras e intervenções urbanas que promovem o debate sobre questões contemporâneas (ambientais, de gênero, raciais).
    </p>,
    <p>
      <strong>Curadoria e Mediação Cultural:</strong> Planejamento e execução de projetos de curadoria (exposições, mostras, eventos culturais), pensando na organização do espaço, na seleção de obras e na mediação com o público.
    </p>,
    <p>
      <strong>Linguagens Híbridas e Processos de Criação:</strong> Desenvolvimento de projetos artísticos que integrem e hibridizem diferentes linguagens (performance com vídeo, instalação sonora), consolidando uma poética pessoal ou coletiva através da criação de portfólios.
    </p>
  ],
};

const Artes3 = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/terceiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosArtes3.area}</p>
        <h1>{dadosArtes3.materia} - 3º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosArtes3.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosArtes3.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Artes3;