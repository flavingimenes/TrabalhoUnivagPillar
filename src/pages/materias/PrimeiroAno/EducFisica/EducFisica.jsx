import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Educação Física organizados em um objeto
const dadosEducacaoFisica = {
  area: "Linguagens e suas Tecnologias",
  materia: "Educação Física",
  competencias: [
    "Compreender os processos de produção e negociação de sentidos nas práticas corporais, reconhecendo-as e vivenciando-as como formas de expressão de valores e identidades.",
    "Adotar atitudes de respeito, solidariedade e responsabilidade que favoreçam a convivência e a participação em práticas corporais.",
    "Apropriar-se da cultura corporal de movimento, de diferentes tempos e lugares, compreendendo a sua diversidade e os processos de disputa por legitimidade."
  ],
  habilidades: [
    <p>
      <strong>Prática e análise de práticas corporais:</strong> Vivenciar e analisar criticamente esportes individuais e coletivos (de marca, de precisão, de invasão, técnico-combinatórios), ginásticas, danças, lutas e práticas corporais de aventura.
    </p>,
    <p>
      <strong>Corpo, saúde e sociedade:</strong> Compreender e discutir os conceitos de saúde, beleza e eficiência corporal, analisando criticamente os padrões corporais veiculados pela mídia.
    </p>,
    <p>
      <strong>Cultura corporal de movimento:</strong> Debater sobre a presença e a transformação da cultura corporal de movimento na sociedade contemporânea, incluindo as novas práticas advindas da cultura digital (jogos eletrônicos, por exemplo).
    </p>,
    <p>
      <strong>Valores e atitudes:</strong> Desenvolver o trabalho em equipe, a cooperação, o respeito às regras e aos adversários, e a resolução de conflitos de forma dialógica e não violenta.
    </p>
  ],
};

const EducFisica = () => {
  // Função que instrui o React a voltar uma página no histórico de navegação.
  const navigate = useNavigate();

  return (
    <div className="materia-container">
      <ScrollToTop />

      <Link to="/primeiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>

      <header className="materia-header">
        <p className="area-title">{dadosEducacaoFisica.area}</p>
        <h1>{dadosEducacaoFisica.materia} - 1º Ano</h1>
      </header>

      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {/* Mapeia o array de competências para criar os itens da lista dinamicamente */}
            {dadosEducacaoFisica.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>

        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {/* Mapeia o array de habilidades para criar os itens da lista dinamicamente */}
            {dadosEducacaoFisica.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default EducFisica;