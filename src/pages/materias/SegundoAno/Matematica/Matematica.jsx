import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Matemática para o 2º Ano
const dadosMatematica2 = {
  area: "Matemática e suas Tecnologias",
  materia: "Matemática",
  competencias: [
    "Modelar e resolver problemas de diversas áreas do conhecimento que envolvam grandezas e medidas, utilizando o formalismo e os procedimentos matemáticos para interpretar dados, construir modelos e validar resultados.",
    "Utilizar o raciocínio matemático, a lógica e a capacidade de abstração para tomar decisões informadas e avaliar criticamente informações quantitativas presentes na sociedade."
  ],
  habilidades: [
    <p>
      <strong>Funções Exponenciais e Logarítmicas:</strong> Estudo aprofundado das funções exponenciais e logarítmicas, seus gráficos, propriedades e aplicação na modelagem de fenômenos como crescimento populacional, juros compostos e decaimento radioativo.
    </p>,
    <p>
      <strong>Trigonometria:</strong> Estudo das funções trigonométricas (seno, cosseno, tangente) no ciclo trigonométrico, análise de seus gráficos, periodicidade e aplicação na resolução de equações e problemas de modelagem.
    </p>,
    <p>
      <strong>Geometria Espacial:</strong> Estudo de prismas, pirâmides, cilindros, cones e esferas, com cálculo de diagonais, áreas laterais, áreas totais e volumes.
    </p>,
    <p>
      <strong>Análise Combinatória e Probabilidade:</strong> Resolução de problemas de contagem utilizando o Princípio Fundamental da Contagem, arranjos, permutações e combinações. Estudo da probabilidade da união de eventos e da probabilidade condicional.
    </p>
  ],
};

const Matematica = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/segundoAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosMatematica2.area}</p>
        <h1>{dadosMatematica2.materia} - 2º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosMatematica2.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosMatematica2.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Matematica;