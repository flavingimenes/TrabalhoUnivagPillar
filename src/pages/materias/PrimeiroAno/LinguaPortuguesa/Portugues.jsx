import React from 'react';
import '../EstiloMaterias.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import ScrollToTop from '../../../../utils/ScrollToTop';

// dados da matéria organizados em um objeto para fácil manutenção

// funciona como se estivesse inserido diretamente no HTML, só que desse jeito, fica mais facil de modificar os dados, não precisa copiar em outra área, caso necessário e tem mais performance.
const dadosPortugues = {
  area: "Linguagens e suas Tecnologias",
  materia: "Língua Portuguesa",


  //conteudo foi inserido aqui somente com ""(áspas) por não precisar adicionar outra tag junto do conteúdo
  competencias: [
    "Compreender a linguagem como fenômeno cultural, histórico, social, variável, heterogêneo e sensível aos contextos de uso.",
    "Analisar criticamente discursos, considerando seus contextos de produção e circulação, e as visões de mundo, ideologias e interesses que veiculam.",
    "Desenvolver o pensamento crítico e a argumentação na leitura e produção de textos, posicionando-se de forma fundamentada e ética.",
    "Utilizar as tecnologias digitais de informação e comunicação de forma crítica, significativa, reflexiva e ética nas diversas práticas de linguagem."
  ],

  //conteúdo inserido com <p> e <strong> pois não seria possivel ser feito somente com áspas  (se tem como, eu n seikkkkk)
  habilidades: [
    <p>
      <strong>Leitura e interpretação de textos:</strong> Análise de textos literários e não literários, identificando informações explícitas e inferindo as implícitas. Foco na análise de gêneros textuais diversos como notícias, reportagens, crônicas, contos, poemas e textos multissemióticos (tirinhas, charges, memes).
    </p>,
    <p>
      <strong>Análise da estrutura de gêneros textuais:</strong> Estudo das características composicionais, estilísticas e temáticas de gêneros que circulam nos campos jornalístico-midiático, literário-artístico e de atuação na vida pública.
    </p>,
    <p>
      <strong>Norma-padrão e variações linguísticas:</strong> Aplicação da norma-padrão da língua portuguesa em produções textuais, com compreensão e respeito às variações linguísticas (sociais, regionais, históricas e de registro) como fenômeno social e cultural.
    </p>,
    <p>
      <strong>Produção textual:</strong> Elaboração de textos orais, escritos e multissemióticos, planejando-os em função do interlocutor, do gênero e do suporte. Exercício da reescrita e da revisão textual.
    </p>,
    <p>
      <strong>Recursos expressivos:</strong> Análise dos efeitos de sentido decorrentes do uso de recursos linguísticos e semióticos, como figuras de linguagem, pontuação e elementos não verbais.
    </p>
  ],
};


const Portugues = () => {

  //função que instrui o React à voltar uma página no histórico de navegação.
  const navigate = useNavigate()

  return (
    <div className="materia-container">
      <ScrollToTop />

      <Link to="/primeiroAno" className="back-button">
        <FaArrowLeftLong />
      </Link>

      <header className="materia-header">
        <p className="area-title">{dadosPortugues.area}</p>
        <h1>{dadosPortugues.materia} - 1º Ano</h1>
      </header>

      <main className="materia-content">
        <section className="content-card">
          <h2 className="section-title">Competências</h2>
          <ul className="competencias-list">
            {/* Mapeia o array de competências para criar os itens da lista dinamicamente */}
            {dadosPortugues.competencias.map((competencia, index) => (
              <li key={index}>{competencia}</li>
            ))}
          </ul>
        </section>

        <section className="content-card">
          <h2 className="section-title">Habilidades</h2>
          <ul className="habilidades-list">
            {/* Mapeia o array de habilidades para criar os itens da lista dinamicamente */}
            {dadosPortugues.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </section>

        <div className='youtubeDiv'>
          <h2 className="section-title" style={{color:'red'}}>Vídeo Youtube</h2>
          <p>
            Vídeo selecionado e recomendado pela nossa equipe, relacionado ao conteúdo de Português do 1° Ano.
          </p>
          <iframe src="https://www.youtube.com/embed/videoseries?si=UReAaWbGafZ5g0UW&amp;list=PL5WAoGdttpPIcOg4BX_53bqh7paM2KJyc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
          className='youtubeFrame'></iframe>
        </div>
      </main>
    </div>
  )
}

export default Portugues;