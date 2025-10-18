import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Química para o 3º Ano
const dadosQuimica3 = {
  area: "Ciências da Natureza e suas Tecnologias",
  materia: "Química",
  competencias: [
    "Avaliar os benefícios e riscos de processos químicos e tecnológicos, propondo soluções sustentáveis para desafios sociais e ambientais.",
    "Relacionar as propriedades das substâncias orgânicas com suas estruturas e aplicações na indústria, na medicina e no cotidiano."
  ],
  habilidades: [
    <p>
      <strong>Eletroquímica:</strong> Estudo de pilhas, baterias, eletrólise e seus processos de oxirredução, relacionando-os com a produção de energia e a corrosão de materiais.
    </p>,
    <p>
      <strong>Reações Orgânicas e Polímeros:</strong> Estudo dos principais tipos de reações orgânicas (adição, substituição, eliminação). Compreensão da química dos polímeros, biomoléculas (carboidratos, proteínas) e da indústria petroquímica.
    </p>,
    <p>
      <strong>Química Ambiental:</strong> Análise química de problemas ambientais como a chuva ácida, a poluição da água e do ar, e os princípios da química verde para um desenvolvimento sustentável.
    </p>
  ],
};

const Quimica3 = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/terceiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosQuimica3.area}</p>
        <h1>{dadosQuimica3.materia} - 3º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosQuimica3.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosQuimica3.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Quimica3;