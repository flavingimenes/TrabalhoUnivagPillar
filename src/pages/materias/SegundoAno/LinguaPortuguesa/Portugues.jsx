import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; 

// Dados da matéria de Língua Portuguesa para o 2º Ano
const dadosPortugues2 = {
  area: "Linguagens e suas Tecnologias",
  materia: "Língua Portuguesa",
  competencias: [
    "Aprofundar a compreensão da linguagem como um fenômeno cultural e histórico, analisando como as escolhas linguísticas e os estilos de época refletem e constroem visões de mundo, ideologias e tensões sociais.",
    "Fortalecer a capacidade de argumentação e defesa de um ponto de vista, mobilizando conhecimentos de diferentes áreas para construir um discurso coeso, coerente e persuasivo, tanto na escrita quanto na oralidade."
  ],
  habilidades: [
    <p>
      <strong>Literatura (Escolas Literárias):</strong> Análise aprofundada das estéticas literárias do século XIX no Brasil e em Portugal, como o Romantismo (idealização, nacionalismo), Realismo/Naturalismo (crítica social, objetividade, determinismo) e Parnasianismo/Simbolismo. Início do estudo do Pré-Modernismo e das vanguardas europeias que preparam o terreno para o Modernismo brasileiro.
    </p>,
    <p>
      <strong>Produção Textual (Dissertação-Argumentativa):</strong> Estudo e prática da estrutura do texto dissertativo-argumentativo, com foco na construção de uma tese clara, no desenvolvimento de parágrafos argumentativos sólidos (usando estratégias como exemplificação, dados estatísticos, argumento de autoridade) e na elaboração de repertório sociocultural para fundamentar a argumentação.
    </p>
  ],
};

const Portugues = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/segundoAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosPortugues2.area}</p>
        <h1>{dadosPortugues2.materia} - 2º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosPortugues2.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosPortugues2.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Portugues;