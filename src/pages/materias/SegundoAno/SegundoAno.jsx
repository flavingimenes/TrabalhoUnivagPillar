import React from 'react'
import SideBar from '../../../components/SideBar'
import { FaBook } from "react-icons/fa";
import './SegundoAno.css'
import HeaderImg from '../../../assets/Imgs/bookBackground.jpg'
import { NavLink } from 'react-router-dom';
import ScrollToTop from '../../../utils/ScrollToTop';
import Portugues from '../PrimeiroAno/LinguaPortuguesa/Portugues';
import { FaLongArrowAltRight } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { FaSquareRootAlt } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";

const SegundoAno = () => {
  return (
    <>
      <div className='root-home'>
        <ScrollToTop />
        <SideBar />
        <div className='main-div'>

          <header className='header-container'>
            <img src={HeaderImg} alt="HeaderImg" className='header-img' />
            <FaBook className='book-header' />
          </header>
          <div className='header-text-main'>
            <h1>
              2º Ano do Ensino Médio
            </h1>
            <h3>
              Estas seções de matérias das grades curriculares do Ensino Médio contem resumos das principais habilidades e competências a serem desenvolvidas em cada matéria, seguindo a Base Nacional Curricular <a href="https://basenacionalcomum.mec.gov.br/abase" target='blank'>(BNCC)</a>
            </h3>
          </div>


          {/* LINGUAGENS E SUAS TEC. */}
          <div className='main-content'>
            <h3 className='material-name'>
              Linguagens e suas Tecnologias
              <GiBookshelf className="icon-in-materialname" 
              style={{color: '#acd310ff'}}/>
            </h3>

            <NavLink to="/segundoAno/portugues" >
            <div className='material-box'>
              <p>Lingua Portuguesa</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >

            <NavLink to="/segundoAno/Artes" >
            <div className='material-box'>
              <p>Arte</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >

            <NavLink to="/segundoAno/EducFisica" >
            <div className='material-box'>
              <p>Educação Física</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >

            <NavLink to="/segundoAno/ingles" >
            <div className='material-box'>
              <p>Língua Inglesa</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >
          </div>


          {/* MATEMATICA E SUAS TEC. */}
          <div className='main-content'>
            <h3 className='material-name'>
              Matemática e suas Tecnologias
              <FaSquareRootAlt 
              className="icon-in-materialname"
              style={{color: '#d84343ff'}}/>
            </h3>

            <NavLink to="/segundoAno/matematica" >
            <div className='material-box'>
              <p>Matemática</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >
          </div>


          {/* CIENCIAS DA NATUREZA E SUAS TEC. */}
          <div className='main-content'>
            <h3 className='material-name'>
              Ciências da Natureza e suas Tecnologias
              <FaLeaf 
              className="icon-in-materialname"
              style={{color: '#45da37ff'}}/>
            </h3>

            <NavLink to="/segundoAno/biologia" >
            <div className='material-box'>
              <p>Biologia</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >

            <NavLink to="/segundoAno/fisica" >
            <div className='material-box'>
              <p>Fisica</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >

            <NavLink to="/segundoAno/quimica" >
            <div className='material-box'>
              <p>Química</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >
          </div>


          {/* CIENCIAS HUMANAS E SOCIAS APLICADAS */}
          <div className='main-content'>
            <h3 className='material-name'>
              Ciências Humanas e Sociais Aplicadas
              <BiWorld 
              className="icon-in-materialname"
              style={{color: '#2d2dc7ff'}}/>
            </h3>

            <NavLink to="/segundoAno/historia" >
            <div className='material-box'>
              <p>História</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >

            <NavLink to="/segundoAno/sociologia" >
            <div className='material-box'>
              <p>Sociologia</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >

            <NavLink to="/segundoAno/filosofia" >
            <div className='material-box'>
              <p>Filosofia</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >
          </div>
        </div>
      </div>
    </>
  )
}

export default SegundoAno