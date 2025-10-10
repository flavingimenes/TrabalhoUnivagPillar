import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Arte organizados em um objeto
const dadosArte = {
  area: "Linguagens e suas Tecnologias",
  materia: "Artes",
  competencias: [
    "Valorizar e fruir as diversas manifestações artísticas e culturais, das locais às mundiais, e participar da produção e do circuito de bens culturais.",
    "Compreender as relações entre as linguagens da Arte e suas práticas integradas, e os processos de disputa por legitimidade que as constituem no tempo e no espaço.",
    "Relacionar as práticas artísticas às diferentes dimensões da vida social, cultural, política, histórica, econômica e estética."
  ],
  habilidades: [
    <p>
      <strong>Análise e contextualização:</strong> Pesquisar e analisar obras de arte de diferentes períodos, estilos e culturas (com ênfase na arte brasileira), relacionando-as aos seus contextos de produção e circulação.
    </p>,
    <p>
      <strong>Experimentação e criação:</strong> Vivenciar e explorar diversas linguagens artísticas (artes visuais, dança, música, teatro), utilizando diferentes materialidades e processos de criação.
    </p>,
    <p>
      <strong>Patrimônio cultural:</strong> Investigar e valorizar o patrimonio cultural material e imaterial, reconhecendo as heranças culturais e a diversidade de manifestações artísticas.
    </p>,
    <p>
      <strong>Mediação cultural:</strong> Analisar a mediação cultural e o papel de espaços como museus, galerias e teatros na circulação da arte.
    </p>
  ],
};

const Artes = () => {
  // Função que instrui o React a voltar uma página no histórico de navegação.
  const navigate = useNavigate();

  return (
    <div className="materia-container">
      <ScrollToTop />

      <Link to="/primeiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>

      <header className="materia-header">
        <p className="area-title">{dadosArte.area}</p>
        <h1>{dadosArte.materia} - 1º Ano</h1>
      </header>

      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {/* Mapeia o array de competências para criar os itens da lista dinamicamente */}
            {dadosArte.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>

        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {/* Mapeia o array de habilidades para criar os itens da lista dinamicamente */}
            {dadosArte.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Artes;