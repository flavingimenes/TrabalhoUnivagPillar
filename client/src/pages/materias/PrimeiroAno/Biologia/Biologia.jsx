import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; // Ajuste o caminho se necessário

// Dados da matéria de Biologia
const dadosBiologia = {
  area: "Ciências da Natureza e suas Tecnologias",
  materia: "Biologia",
  competencias: [
    "Analisar e interpretar fenômenos naturais e processos tecnológicos, com base nas interações e relações entre matéria e energia, para propor ações individuais e coletivas que visem a melhoria da qualidade de vida.",
    "Compreender a vida em sua diversidade, complexidade e evolução, valorizando a biodiversidade e a necessidade de sua conservação.",
    "Avaliar as implicações de intervenções humanas nos ecossistemas e na saúde individual e coletiva."
  ],
  habilidades: [
    <p>
      <strong>Citologia:</strong> Estudo da estrutura e função das células procarióticas e eucarióticas, com foco nas organelas celulares e nos processos de divisão celular (mitose e meiose).
    </p>,
    <p>
      <strong>Genética Mendeliana:</strong> Compreensão dos conceitos fundamentais da hereditariedade, como genes, alelos, dominância e recessividade. Aplicação das Leis de Mendel para resolver problemas de herança genética.
    </p>,
    <p>
      <strong>Ecologia:</strong> Análise de ecossistemas, identificando os componentes bióticos e abióticos. Estudo do fluxo de energia e matéria em cadeias e teias alimentares, e análise das relações ecológicas entre os seres vivos.
    </p>,
    <p>
      <strong>Bioquímica Celular:</strong> Identificação dos principais compostos orgânicos (carboidratos, lipídios, proteínas e ácidos nucleicos) e sua importância para os seres vivos.
    </p>
  ],
};

const Biologia = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/primeiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosBiologia.area}</p>
        <h1>{dadosBiologia.materia} - 1º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosBiologia.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosBiologia.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Biologia;