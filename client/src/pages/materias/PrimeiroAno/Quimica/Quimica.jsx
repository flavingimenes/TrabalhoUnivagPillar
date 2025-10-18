import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop'; // Ajuste o caminho se necessário

// Dados da matéria de Química
const dadosQuimica = {
  area: "Ciências da Natureza e suas Tecnologias",
  materia: "Química",
  competencias: [
    "Compreender a constituição da matéria (átomos, moléculas, íons) e as transformações químicas como processos de reorganização de átomos.",
    "Aplicar o conhecimento químico para interpretar fenômenos do cotidiano, do ambiente e da tecnologia, avaliando seus impactos na sociedade.",
    "Utilizar a linguagem simbólica da Química para representar e comunicar informações sobre a composição e transformação da matéria."
  ],
  habilidades: [
    <p>
      <strong>Estrutura Atômica:</strong> Estudo dos modelos atômicos (Dalton, Thomson, Rutherford, Bohr) e da estrutura do átomo (prótons, nêutrons, elétrons). Compreensão dos conceitos de número atômico, número de massa, isótopos, isóbaros e isótonos.
    </p>,
    <p>
      <strong>Tabela Periódica:</strong> Organização dos elementos na Tabela Periódica e análise das propriedades periódicas (raio atômico, energia de ionização, eletronegatividade).
    </p>,
    <p>
      <strong>Ligações Químicas:</strong> Compreensão das ligações iônicas, covalentes e metálicas para explicar a formação de substâncias.
    </p>,
    <p>
      <strong>Misturas e Reações:</strong> Classificação de sistemas em substâncias puras e misturas. Estudo dos processos de separação de misturas. Introdução à classificação de reações químicas e ao balanceamento de equações.
    </p>
  ],
};

const Quimica = () => {
  return (
    <div className="materia-container">
      <ScrollToTop />
      <Link to="/primeiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>
      <header className="materia-header">
        <p className="area-title">{dadosQuimica.area}</p>
        <h1>{dadosQuimica.materia} - 1º Ano</h1>
      </header>
      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {dadosQuimica.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>
        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {dadosQuimica.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Quimica;