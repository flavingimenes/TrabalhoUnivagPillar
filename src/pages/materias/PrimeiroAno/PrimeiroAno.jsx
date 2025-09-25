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
        <div className='mainContent'>

          <header className='header-container'>
            <img src={HeaderImg} alt="HeaderImg" className='header-img'/>
              <FaBook className='book-header' />
          </header>


        </div>
      </div>
    </>
  )
}

export default PrimeiroAno