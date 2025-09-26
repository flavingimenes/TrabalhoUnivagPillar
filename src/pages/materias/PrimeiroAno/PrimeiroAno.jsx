import React from 'react'
import SideBar from '../../../components/SideBar'
import { FaBook } from "react-icons/fa";
import './PrimeiroAno.css'
import HeaderImg from '../../../assets/Imgs/bookBackground.png'

const PrimeiroAno = () => {
  return (
    <>
      <div className='root-home'>
        <SideBar />
        <div className='main-div'>

          <header className='header-container'>
            <img src={HeaderImg} alt="HeaderImg" className='header-img' />
            <FaBook className='book-header' />
          </header>
          <div className='header-text-main'>
            <h1>
              1º Ano do Ensino Médio
            </h1>
          </div>
          <div className='main-content'>
            <h3 className='material-name'>
              Linguagens e suas Tecnologias
            </h3>
            <h4>
              ● Língua Portuguesa:
            </h4>
            <p>
              <br />○ Habilidades: Leitura e interpretação de textos literários e não literários. Análise da
              estrutura de gêneros textuais (notícia, crônica, conto). Uso da norma-padrão e
              compreensão de variações linguísticas. <br /><br />
              ○ Competências: Compreender a linguagem como forma de interação social, de
              expressão e de acesso à informação. Desenvolver a argumentação e o pensamento
              crítico na leitura e na produção textual.

            </p>
            <br /><br />
            <p>
              <br />○ Habilidades: Leitura e interpretação de textos literários e não literários. Análise da
              estrutura de gêneros textuais (notícia, crônica, conto). Uso da norma-padrão e
              compreensão de variações linguísticas. <br /><br />
              ○ Competências: Compreender a linguagem como forma de interação social, de
              expressão e de acesso à informação. Desenvolver a argumentação e o pensamento
              crítico na leitura e na produção textual.

            </p>
          </div>

        </div>
      </div>
    </>
  )
}

export default PrimeiroAno