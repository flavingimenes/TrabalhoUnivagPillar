import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; // Ajuste o caminho se necessário

// Dados da matéria de Matemática
const dadosMatematica = {
  area: "Matemática e suas Tecnologias",
  materia: "Matemática",
  competencias: [
    "Utilizar estratégias, conceitos e procedimentos matemáticos para interpretar situações em diversos contextos (sejam atividades cotidianas, sejam fatos das Ciências da Natureza e Humanas, ou do mundo do trabalho).",
    "Desenvolver o raciocínio lógico, o espírito de investigação e a capacidade de produzir argumentos convincentes, recorrendo aos conhecimentos matemáticos para compreender e atuar no mundo.",
    "Analisar e interpretar dados representados em diferentes formatos (tabelas e gráficos) para tomar decisões e fazer inferências."
  ],
  habilidades: [
    <p>
      <strong>Conjuntos Numéricos:</strong> Estudo dos conjuntos numéricos (Naturais, Inteiros, Racionais e Reais), suas operações e representação na reta numérica.
    </p>,
    <p>
      <strong>Funções:</strong> Introdução ao conceito de função, análise de domínio, contradomínio e imagem. Estudo aprofundado da função afim (função do 1º grau) e da função quadrática (função do 2º grau), incluindo construção e interpretação de gráficos, análise de raízes, vértices e crescimento/decrescimento.
    </p>,
    <p>
      <strong>Geometria Plana:</strong> Aprofundamento no cálculo de áreas e perímetros de figuras planas. Estudo das relações métricas no triângulo retângulo e introdução à trigonometria (seno, cosseno e tangente).
    </p>,
    <p>
      <strong>Estatística e Probabilidade:</strong> Coleta, organização e representação de dados em tabelas e gráficos. Cálculo e interpretação de medidas de tendência central (média, moda e mediana) e introdução a noções de probabilidade em espaços amostrais equiprováveis.
    </p>
  ],
};

const Matematica = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/primeiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosMatematica.area}</p>
        <h1>{dadosMatematica.materia} - 1º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosMatematica.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosMatematica.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Matematica;