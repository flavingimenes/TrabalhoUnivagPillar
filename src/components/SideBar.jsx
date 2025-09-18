import React from 'react'
import './SideBar.css'
import logoPillar from '../assets/PillarLogo-removebg.png'
import Home from '../pages/Home/Home'
import { Link } from 'react-router-dom'
import Materias from '../pages/materias/Materias'
import login from '../pages/Forms/Login'

const SideBar = () => {
  return (
    <>
    <div className='sidebar'>
        <img src={logoPillar} alt="logo pillar" className='logo-sidebar'/>
        <h2 style={{fontSize: "20px", marginTop: "20px", marginBottom: "20px"}}>Bom dia, aluno</h2>
        <hr className='line'/>
        <div style={{display:"grid"}}>
            <Link to="/home" className='sidebar-link'>Página Inicial </Link>
            <Link to="/materias" className='sidebar-link'>Matérias</Link>
        </div>
        <Link to="/" className='logout-bottom'>Sair</Link>
    </div>
    </>
  )
}

export default SideBar