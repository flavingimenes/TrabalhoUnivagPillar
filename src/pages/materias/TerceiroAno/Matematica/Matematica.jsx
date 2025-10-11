import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Matemática para o 3º Ano
const dadosMatematica3 = {
  area: "Matemática e suas Tecnologias",
  materia: "Matemática",
  competencias: [
    "Aplicar conceitos e procedimentos matemáticos na construção de modelos para analisar e resolver problemas complexos, validando e interpretando suas soluções.",
    "Utilizar o pensamento matemático e a linguagem formal para formular e comunicar argumentos consistentes e tomar decisões baseadas em análise de dados."
  ],
  habilidades: [
    <p>
      <strong>Geometria Analítica:</strong> Estudo analítico do ponto, da reta e da circunferência, incluindo cálculos de distância, equações da reta, posições relativas e introdução às cônicas (elipse, hipérbole, parábola).
    </p>,
    <p>
      <strong>Polinômios e Números Complexos:</strong> Operações com polinômios, estudo das relações de Girard, resolução de equações polinomiais e introdução ao conjunto dos números complexos e suas operações.
    </p>,
    <p>
      <strong>Estatística e Probabilidade:</strong> Aprofundamento em probabilidade (distribuição binomial) e noções de estatística inferencial, analisando pesquisas de amostragem, medidas de dispersão (desvio padrão) e seus intervalos de confiança.
    </p>,
    <p>
      <strong>Matemática Financeira e Revisão:</strong> Aplicação de juros simples e compostos, anuidades e sistemas de amortização. Revisão estratégica de todo o conteúdo do Ensino Médio para exames e vestibulares.
    </p>
  ],
};

const Matematica3 = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/terceiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosMatematica3.area}</p>
        <h1>{dadosMatematica3.materia} - 3º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosMatematica3.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosMatematica3.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Matematica3;