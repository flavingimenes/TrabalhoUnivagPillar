import { Link } from 'react-router-dom'
import React from 'react'
import './form.css'


const Register = () => {
  return (
    <>
    <div className='register-div'>
        <h1>Registrar Conta</h1>
        <form className='register-form'>
            <input type="text" id="nome" name="nome" placeholder='Nome'/>
            <br />
            <input type="email" id="email" name="email" placeholder='Email'/>
            <br />
            <input type="password" id="senha" name="senha" placeholder='Senha'/>
        </form>
        <button>Cadastrar!</button>
        <br />
        <Link to="/">Já possui conta?</Link>
    </div>
    </>
  )
}

export default Register