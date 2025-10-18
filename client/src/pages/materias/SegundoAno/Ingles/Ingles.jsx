import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; 

// Dados da matéria de Língua Inglesa para o 2º Ano
const dadosLinguaInglesa2 = {
  area: "Linguagens e suas Tecnologias",
  materia: "Língua Inglesa",
  competencias: [
    "Usar a Língua Inglesa para se comunicar de forma mais elaborada e autônoma, expandindo a capacidade de interagir em situações que exijam a negociação de significados e a expressão de subjetividade.",
    "Analisar criticamente textos e discursos em inglês, reconhecendo como a linguagem pode ser utilizada para construir narrativas, influenciar opiniões e reforçar ou questionar estereótipos culturais."
  ],
  habilidades: [
    <p>
      <strong>Produção Oral e Escrita Argumentativa:</strong> Produção de textos escritos (parágrafos, resenhas curtas, e-mails formais) e orais (apresentações, participação em debates) mais complexos, que expressem opinião e argumentação de forma estruturada.
    </p>,
    <p>
      <strong>Leitura e Análise de Gêneros Midiáticos:</strong> Compreensão de textos de diferentes gêneros midiáticos (notícias, anúncios publicitários, blogs de opinião, videorreportagens), identificando não apenas a informação principal, mas também o ponto de vista, o público-alvo e as estratégias de persuasão utilizadas.
    </p>
  ],
};

const Ingles = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/segundoAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosLinguaInglesa2.area}</p>
        <h1>{dadosLinguaInglesa2.materia} - 2º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosLinguaInglesa2.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosLinguaInglesa2.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Ingles;