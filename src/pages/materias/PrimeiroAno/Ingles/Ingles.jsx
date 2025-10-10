import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from 
"react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// Dados da matéria de Língua Inglesa organizados em um objeto
const dadosLinguaInglesa = {
  area: "Linguagens e suas Tecnologias",
  materia: "Língua Inglesa",
  competencias: [
    "Utilizar a Língua Inglesa como ferramenta de acesso a informações, culturas e modos de vida de outros povos, posicionando-se criticamente em relação a eles.",
    "Comunicar-se em Língua Inglesa, por meio do uso variado de linguagens, em diferentes contextos, de forma básica e eficiente.",
    "Compreender o papel da Língua Inglesa como língua franca no mundo globalizado, valorizando a diversidade linguística e cultural."
  ],
  habilidades: [
    <p>
      <strong>Compreensão de textos autênticos:</strong> Ler e compreender textos orais e escritos autênticos em inglês, de gêneros variados (músicas, trechos de filmes, artigos de divulgação, posts em redes sociais).
    </p>,
    <p>
      <strong>Estratégias de leitura e escuta:</strong> Utilizar diferentes estratégias para a construção de sentidos, como a identificação do tema geral, de informações específicas e a inferência de vocabulário a partir do contexto.
    </p>,
    <p>
      <strong>Reconhecimento lexical e gramatical:</strong> Identificar e utilizar vocabulário e estruturas gramaticais básicas em situações de comunicação.
    </p>,
    <p>
      <strong>Produção oral e escrita:</strong> Participar de interações orais e produzir textos escritos simples sobre temas de interesse pessoal e coletivo.
    </p>
  ],
};

const Ingles = () => {
  // Função que instrui o React a voltar uma página no histórico de navegação.
  const navigate = useNavigate();

  return (
    <div className="materia-container">
      <ScrollToTop />

      <Link to="/primeiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>

      <header className="materia-header">
        <p className="area-title">{dadosLinguaInglesa.area}</p>
        <h1>{dadosLinguaInglesa.materia} - 1º Ano</h1>
      </header>

      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {/* Mapeia o array de competências para criar os itens da lista dinamicamente */}
            {dadosLinguaInglesa.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>

        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {/* Mapeia o array de habilidades para criar os itens da lista dinamicamente */}
            {dadosLinguaInglesa.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Ingles;