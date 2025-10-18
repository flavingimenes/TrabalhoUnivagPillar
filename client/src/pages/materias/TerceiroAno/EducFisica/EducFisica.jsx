import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Educação Física para o 3º Ano
const dadosEducacaoFisica3 = {
  area: "Linguagens e suas Tecnologias",
  materia: "Educação Física",
  competencias: [
    "Apropriar-se da cultura corporal de movimento de forma autônoma, para cuidar de si, do outro e dos espaços coletivos, e para usufruir do lazer de forma consciente.",
    "Analisar criticamente os discursos sobre corpo, saúde e beleza, combatendo preconceitos e estereótipos e valorizando a diversidade."
  ],
  habilidades: [
    <p>
      <strong>Gestão de Práticas Corporais e Lazer:</strong> Planejamento, organização e execução autônoma de projetos de lazer e eventos esportivos na comunidade escolar (torneios, festivais de dança, gincanas).
    </p>,
    <p>
      <strong>Esporte, Lazer e Políticas Públicas:</strong> Análise crítica do direito ao esporte e ao lazer. Investigação sobre políticas públicas de incentivo às práticas corporais e sua acessibilidade. Debate sobre o esporte de alto rendimento e suas implicações sociais e econômicas.
    </p>,
    <p>
      <strong>Práticas Corporais Alternativas e Saúde:</strong> Vivência e reflexão sobre práticas corporais não convencionais e sua relação com o bem-estar e a saúde integral (yoga, pilates, meditação, parkour).
    </p>
  ],
};

const EducFisica3 = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/terceiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosEducacaoFisica3.area}</p>
        <h1>{dadosEducacaoFisica3.materia} - 3º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosEducacaoFisica3.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosEducacaoFisica3.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default EducFisica3;