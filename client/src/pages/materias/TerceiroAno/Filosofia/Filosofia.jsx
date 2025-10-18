import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Filosofia para o 3º Ano
const dadosFilosofia3 = {
  area: "Ciências Humanas e Sociais Aplicadas",
  materia: "Filosofia",
  competencias: [
    "Exercer a reflexão crítica e autônoma para analisar problemas complexos de natureza ética, política, epistemológica e existencial.",
    "Dialogar com diferentes tradições filosóficas e campos do saber para construir uma visão de mundo fundamentada e aberta a novas perspectivas."
  ],
  habilidades: [
    <p>
      <strong>Filosofia Contemporânea:</strong> Estudo de correntes como o Existencialismo (Sartre), a Escola de Frankfurt (Adorno, Horkheimer), e o pensamento de filósofos como Foucault (poder) e Simone de Beauvoir (gênero).
    </p>,
    <p>
      <strong>Estética e Filosofia da Arte:</strong> Reflexão sobre o conceito de belo, a função da arte e a experiência estética na contemporaneidade, analisando a indústria cultural e a reprodutibilidade técnica.
    </p>,
    <p>
      <strong>Bioética:</strong> Discussão filosófica sobre questões éticas relacionadas aos avanços da ciência e da tecnologia, como engenharia genética, inteligência artificial e o início e fim da vida.
    </p>
  ],
};

const Filosofia3 = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/terceiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosFilosofia3.area}</p>
        <h1>{dadosFilosofia3.materia} - 3º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosFilosofia3.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosFilosofia3.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Filosofia3;