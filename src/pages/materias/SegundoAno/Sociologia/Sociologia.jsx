import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Sociologia para o 2º Ano
const dadosSociologia2 = {
  area: "Ciências Humanas e Sociais Aplicadas",
  materia: "Sociologia",
  competencias: [
    "Desenvolver uma compreensão crítica da sociedade brasileira e global, desnaturalizando as desigualdades e identificando as estruturas sociais que as produzem e reproduzem.",
    "Interpretar e analisar diferentes contextos sociais, utilizando conceitos sociológicos para compreender as relações entre indivíduo, cultura e sociedade."
  ],
  habilidades: [
    <p>
      <strong>Trabalho e Sociedade:</strong> Análise sociológica do trabalho a partir dos pensadores clássicos. Estudo das transformações no mundo do trabalho (taylorismo, fordismo, toyotismo) e dos desafios contemporâneos (precarização, uberização, desemprego).
    </p>,
    <p>
      <strong>Estratificação e Desigualdade Social:</strong> Estudo dos conceitos de estratificação e das diferentes formas de desigualdade (de classe, de gênero, étnico-racial) na sociedade brasileira, analisando suas causas e consequências.
    </p>,
    <p>
      <strong>Política, Estado e Movimentos Sociais:</strong> Análise das teorias sobre o Estado, poder e dominação. Compreensão do papel dos movimentos sociais como atores políticos na luta por direitos e transformações sociais.
    </p>
  ],
};

const Sociologia = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/segundoAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosSociologia2.area}</p>
        <h1>{dadosSociologia2.materia} - 2º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosSociologia2.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosSociologia2.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Sociologia;