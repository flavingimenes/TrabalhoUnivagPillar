import React from 'react'
import "./Activities.css"
import SideBar from '../../components/SideBar'
import HeaderImg from '../../assets/Imgs/bookBackground.jpg'

const Activities = () => {
  return (
    <div className='root-home'>
      <SideBar />
      <div className='main-div'>
        <header>
          <img src={HeaderImg} alt="HeaderImg" className='header-img' />
        </header>
        <h2>ATIVIDADES</h2>
      </div>
    </div>
  )
}

export default Activities