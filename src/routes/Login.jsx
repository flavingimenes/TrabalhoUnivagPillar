import React from 'react'
import { Link } from 'react-router-dom'
import './form.css'

const Login = () => {
  return (
    <>
      <div className='login-div'>
        <h1>Login</h1>
        <form className='login-form'>
          <input type="text" id="nome" name="nome" placeholder='Nome ou Email' />
          <br />
          <input type="password" id="senha" name="senha" placeholder='Senha' />
        </form>
        <button>Entrar!</button>
        <br />
        <Link to="/register">Criar nova conta</Link>
      </div>
    </>
  )
}

export default Login