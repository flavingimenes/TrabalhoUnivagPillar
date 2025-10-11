import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';
// Dados da matéria de Química para o 2º Ano
const dadosQuimica2 = {
  area: "Ciências da Natureza e suas Tecnologias",
  materia: "Química",
  competencias: [
    "Compreender os princípios de energia e velocidade que regem as transformações químicas, relacionando-os a processos industriais, biológicos e ambientais.",
    "Relacionar a estrutura, as propriedades e a reatividade dos compostos químicos com questões ambientais e industriais, avaliando os impactos de sua produção e descarte."
  ],
  habilidades: [
    <p>
      <strong>Físico-Química (Soluções e Cinética):</strong> Estudo de soluções (concentração, diluição, misturas) e das propriedades coligativas. Análise da cinética química, compreendendo os fatores que alteram a velocidade das reações e o conceito de energia de ativação.
    </p>,
    <p>
      <strong>Físico-Química (Termoquímica e Equilíbrio):</strong> Estudo da termoquímica (reações exotérmicas e endotérmicas, Lei de Hess) e do equilíbrio químico (constante de equilíbrio, princípio de Le Chatelier).
    </p>,
    <p>
      <strong>Introdução à Química Orgânica:</strong> Estudo das características do átomo de carbono, classificação de cadeias carbônicas, e reconhecimento e nomenclatura das principais funções orgânicas (hidrocarbonetos, álcoois, aldeídos, cetonas, ácidos carboxílicos).
    </p>
  ],
};

const Quimica = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/segundoAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosQuimica2.area}</p>
        <h1>{dadosQuimica2.materia} - 2º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosQuimica2.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosQuimica2.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Quimica;