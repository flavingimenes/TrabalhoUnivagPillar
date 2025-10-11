import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Língua Inglesa para o 3º Ano
const dadosLinguaInglesa3 = {
  area: "Linguagens e suas Tecnologias",
  materia: "Língua Inglesa",
  competencias: [
    "Utilizar a língua inglesa para acessar conhecimentos de outras áreas e interagir com culturas diversas, agindo como cidadão do mundo.",
    "Fazer uso da língua inglesa de modo a expandir as possibilidades de participação social no mundo globalizado e no mercado de trabalho."
  ],
  habilidades: [
    <p>
      <strong>Inglês para Fins Acadêmicos e Profissionais:</strong> Leitura e interpretação de artigos científicos, resumos (abstracts) e notícias de âmbito internacional. Produção de textos como currículo (résumé/CV) e carta de apresentação (cover letter).
    </p>,
    <p>
      <strong>Debates sobre Questões Globais:</strong> Participação em debates orais e produção de textos argumentativos sobre temas complexos (sustentabilidade, migrações, direitos humanos), utilizando a língua inglesa como ferramenta de comunicação intercultural.
    </p>,
    <p>
      <strong>Análise de Discurso Intercultural:</strong> Análise de produtos culturais (filmes, séries, músicas) de diferentes países de língua inglesa, identificando aspectos culturais, estereótipos e visões de mundo.
    </p>
  ],
};

const Ingles3 = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/terceiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosLinguaInglesa3.area}</p>
        <h1>{dadosLinguaInglesa3.materia} - 3º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosLinguaInglesa3.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosLinguaInglesa3.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Ingles3;