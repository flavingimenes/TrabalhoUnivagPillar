// Importamos o 'useEffect'
import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './form.css';
import './logo.css';
import logoPillar from '../../assets/PillarLogo-removebg.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

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

      // Função de limpeza:
      // Se o usuário tentar enviar de novo antes dos 5s,
      // o timer antigo é cancelado.
      return () => clearTimeout(timerId);
    }
  }, [error]); // <-- Array de dependências: só roda quando 'error' mudar.
  // --- FIM DO NOVO BLOCO ---


  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(null); 

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha no login');
      }

      localStorage.setItem('token', data.token);
      navigate('/home');

    } catch (err) {
      setError(err.message); // <-- Quando isso acontece, o useEffect acima é ativado
      console.error('Erro no login:', err);
    }
  };

  return (
    <>
      <div className='main-forms'>
        <div className='login-div'>
          <img src={logoPillar} alt="logo pillar" className='logo'/>
          
          <form className='login-form' onSubmit={handleLogin}> 
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
              name="password"
              placeholder='Senha' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className='button'>Entrar!</button>
          </form>
          
          <br />
          <Link to="/register">Criar nova conta</Link>
        </div>
      </div>
    </>
  )
}

export default Login;