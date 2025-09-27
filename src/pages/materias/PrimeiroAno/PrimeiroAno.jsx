import React from 'react'
import SideBar from '../../../components/SideBar'
import { FaBook } from "react-icons/fa";
import './PrimeiroAno.css'
import HeaderImg from '../../../assets/Imgs/bookBackground.png'
import { NavLink } from 'react-router-dom';
import Portugues from '../PrimeiroAno/LinguaPortuguesa/Portugues';
import { FaLongArrowAltRight } from "react-icons/fa";

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

            <NavLink to="/portugues" >
            <div className='material-box'>
              <p>Lingua Portuguesa</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >

            <NavLink to="/portugues" >
            <div className='material-box'>
              <p>Arte</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >

            <NavLink to="/portugues" >
            <div className='material-box'>
              <p>Educação Física</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >

            <NavLink to="/portugues" >
            <div className='material-box'>
              <p>Língua Inglesa</p>
              <FaLongArrowAltRight />
            </div>
            </NavLink >
          </div>

        </div>
      </div>
    </>
  )
}

export default PrimeiroAno