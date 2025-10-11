import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; 

// Dados da matéria de Física para o 2º Ano
const dadosFisica2 = {
  area: "Ciências da Natureza e suas Tecnologias",
  materia: "Física",
  competencias: [
    "Aplicar os conceitos da Física para explicar e prever o funcionamento de fenômenos naturais e de tecnologias presentes no cotidiano (ex: funcionamento de uma geladeira, formação de imagens em óculos, funcionamento de um chuveiro elétrico).",
    "Compreender o funcionamento de tecnologias baseadas em princípios físicos, avaliando seus benefícios e riscos para a sociedade e o meio ambiente."
  ],
  habilidades: [
    <p>
      <strong>Termodinâmica:</strong> Estudo da termometria (escalas), calorimetria (trocas de calor), dilatação de sólidos e líquidos, estudo dos gases e as Leis da Termodinâmica aplicadas a máquinas térmicas.
    </p>,
    <p>
      <strong>Óptica e Ondulatória:</strong> Análise dos fenômenos ondulatórios (reflexão, refração, difração, interferência, polarização) e da óptica geométrica, incluindo o estudo de espelhos planos e esféricos e lentes delgadas.
    </p>,
    <p>
      <strong>Eletrodinâmica:</strong> Estudo dos conceitos fundamentais da eletricidade, como corrente elétrica, tensão, potência e resistência. Análise de circuitos elétricos simples e aplicação das Leis de Ohm.
    </p>
  ],
};

const Fisica = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/segundoAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosFisica2.area}</p>
        <h1>{dadosFisica2.materia} - 2º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosFisica2.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosFisica2.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Fisica;