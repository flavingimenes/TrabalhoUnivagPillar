import React from 'react'
import './Home.css'
import SideBar from '../../components/SideBar'
import HeaderImg from '../../assets/Imgs/bookBackground.png'

const Home = () => {
  return (
    <>
      <div className='root-home'>
        <SideBar />
        <div className='main-div'>
          <header>
            <img src={HeaderImg} alt="HeaderImg" className='header-img' />
          </header>
          <h2>PÁGINA INICIAL</h2>
        </div>
      </div>
    </>
  )
}

export default Home