import React from 'react'
import './Home.css'
import SideBar from '../../components/SideBar'

const Home = () => {
  return (
    <>
    <div className='root-home'>
        <SideBar />
        <div>
            <h2>PÁGINA INICIAL</h2>
        </div>
    </div>
    </> 
  )
}

export default Home