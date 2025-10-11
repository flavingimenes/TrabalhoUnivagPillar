import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; 

// Dados da matéria de Sociologia para o 3º Ano
const dadosSociologia3 = {
  area: "Ciências Humanas e Sociais Aplicadas",
  materia: "Sociologia",
  competencias: [
    "Analisar as relações de poder e as dinâmicas das instituições sociais na sociedade contemporânea, com foco nos desafios da cidadania e da democracia.",
    "Propor e avaliar soluções éticas para problemas sociais, com base em conceitos sociológicos e no respeito aos direitos humanos."
  ],
  habilidades: [
    <p>
      <strong>Indústria Cultural e Cultura de Massa:</strong> Análise crítica dos meios de comunicação e da cultura digital (redes sociais, algoritmos), discutindo seus impactos na formação de identidades, no consumo e no comportamento social.
    </p>,
    <p>
      <strong>Cidadania, Direitos e Democracia:</strong> Aprofundamento do debate sobre direitos civis, políticos e sociais, e análise dos desafios à democracia no mundo contemporâneo (populismo, polarização, fake news).
    </p>,
    <p>
      <strong>Movimentos Sociais Contemporâneos:</strong> Estudo dos novos movimentos sociais e das pautas identitárias (feminismo, movimento negro, movimento LGBTQIA+) e suas estratégias de atuação na sociedade globalizada.
    </p>
  ],
};

const Sociologia3 = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/terceiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosSociologia3.area}</p>
        <h1>{dadosSociologia3.materia} - 3º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosSociologia3.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosSociologia3.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Sociologia3;