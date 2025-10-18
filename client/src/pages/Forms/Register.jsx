// Importamos o 'useEffect'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// (Seus imports de CSS)
// import './form.css'
// import './logo.css'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  // --- NOVO BLOCO ---
  // Este 'useEffect' "assiste" à variável 'error'.
  useEffect(() => {
    // Se 'error' não for nulo (ou seja, um erro foi definido)
    if (error) {
      // Inicia um timer
      const timerId = setTimeout(() => {
        setError(null); // Limpa o erro após 5000ms (5 segundos)
      }, 5000);

      // Função de limpeza
      return () => clearTimeout(timerId);
    }
  }, [error]); // <-- Array de dependências: só roda quando 'error' mudar.
  // --- FIM DO NOVO BLOCO ---


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError('As senhas não conferem.'); // <-- Ativa o useEffect
      return; 
    }
    
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.'); // <-- Ativa o useEffect
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao registrar.');
      }

      setSuccessMessage('Conta registrada com sucesso! Redirecionando para o login...');

      setTimeout(() => {
        navigate('/'); 
      }, 2000); // <-- Note que a msg de sucesso já some, pois redirecionamos.

    } catch (err) {
      setError(err.message); // <-- Ativa o useEffect
      console.error('Erro no registro:', err);
    }
  };

  return (
    <>
      <div className='main-forms'>
        <div className='register-div'>
          <h1>Registrar Conta</h1>

          <form className='register-form' onSubmit={handleSubmit}>
            
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder='Email'
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input 
              type="password" 
              id="senha" 
              name="senha" 
              placeholder='Senha'
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />

            <input 
              type="password" 
              id="confirmSenha" 
              name="confirmSenha" 
              placeholder='Confirmar Senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            
            {error && <p className="form-error">{error}</p>}
            {successMessage && <p className="form-success">{successMessage}</p>}

            <button type="submit" className="button">Cadastrar!</button>
          </form>
          
          <br />
          <Link to="/">Já possui conta?</Link>
        </div>
      </div>
    </>
  )
}

export default Register;