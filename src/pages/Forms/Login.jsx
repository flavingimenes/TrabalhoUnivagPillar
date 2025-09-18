import React from 'react'
import { Link } from 'react-router-dom'
import './form.css'
import './logo.css'
import logoPillar from '../../assets/PillarLogo-removebg.png'

const Login = () => {
  return (
    <>
      <div className='main-forms'>
        <div className='login-div'>
          <img src={logoPillar} alt="logo pillar" className='logo'/>
          <form className='login-form'>
            <input type="text" id="nome" name="nome" placeholder='Nome ou Email' />
            <br />
            <input type="password" id="senha" name="senha" placeholder='Senha' />
          </form>
          <Link to="/home" className='button'>Entrar!</Link>
          <br />
          <Link to="/register">Criar nova conta</Link>
        </div>
      </div>
    </>
  )
}

export default Login