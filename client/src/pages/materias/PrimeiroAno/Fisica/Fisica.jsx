import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; // Ajuste o caminho se necessário

// Dados da matéria de Física
const dadosFisica = {
  area: "Ciências da Natureza e suas Tecnologias",
  materia: "Física",
  competencias: [
    "Analisar e prever o movimento de corpos em diferentes situações, utilizando modelos físicos e representações matemáticas.",
    "Compreender a relação entre matéria e energia, interpretando os processos de transformação e conservação de energia em fenômenos naturais e tecnológicos.",
    "Construir e aplicar modelos explicativos para os fenômenos físicos do cotidiano e do mundo produtivo."
  ],
  habilidades: [
    <p>
      <strong>Cinemática:</strong> Análise dos conceitos fundamentais do movimento, como posição, deslocamento, velocidade e aceleração. Estudo do Movimento Uniforme (MU) e do Movimento Uniformemente Variado (MUV) e suas equações.
    </p>,
    <p>
      <strong>Dinâmica (Leis de Newton):</strong> Aplicação das três Leis de Newton para a compreensão da relação entre força, massa e aceleração. Identificação e cálculo das principais forças (peso, normal, atrito, tração).
    </p>,
    <p>
      <strong>Energia e Trabalho:</strong> Estudo das diferentes formas de energia (cinética, potencial gravitacional e potencial elástica), do conceito de trabalho de uma força e do Teorema da Energia Cinética. Introdução ao princípio da conservação da energia mecânica.
    </p>
  ],
};

const Fisica = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/primeiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosFisica.area}</p>
        <h1>{dadosFisica.materia} - 1º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosFisica.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosFisica.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Fisica;