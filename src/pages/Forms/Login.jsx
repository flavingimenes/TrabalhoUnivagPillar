// Importamos o 'useEffect'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Seus imports de CSS (o form.css atualizado é essencial)
import './form.css';
import './logo.css';
import logoPillar from '../../assets/PillarLogo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Seu 'useEffect' para limpar o erro (sem alterações)
  useEffect(() => {
    if (error) {
      const timerId = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timerId);
    }
  }, [error]);

  // Sua função 'handleLogin' (sem alterações na lógica)
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
      setError(err.message);
      console.error('Erro no login:', err);
    }
  };

  return (
    // O container principal split-screen
    <div className='register-container'>

      {/* PAINEL ESQUERDO (BRANDING) */}
      <div className='register-branding-panel'>
        <div className='branding-content'>
          
          {/* Texto atualizado para login */}
          <h2>Bem-vindo de volta ao Pillar</h2>
          <p>
            Acesse sua conta e continue construindo
            seu futuro.
          </p>
          
          {/* O mesmo card de depoimento para consistência */}
          <div className='testimonial-card'>
            <p className='testimonial-text'>
              "Quase não precisei fazer nada. Adorei a experiência. Configurei meus estudos, e cuidaram de todos os detalhes necessários em segundos. Recomendo com certeza!"
            </p>
            <div className='testimonial-author'>
              <img src="https://cdn.motor1.com/images/mgl/VPzrl/s1/1x1/davidson-sportster-s---midnight-crimson-main.webp" alt="Catherine Johns" />
              <span>Dhiogo Nascimento</span>
            </div>
          </div>
        </div>
      </div>

      {/* PAINEL DIREITO (FORMULÁRIO) */}
      <div className='register-form-panel'>
        <div className='form-wrapper'>

          <div className='branding-logo'>
            <img 
              src={logoPillar} 
              alt="Pillar Logo" 
              style={{ height: '130px', width: 'auto' }} 
            />
          </div>
          <h1>Login</h1>
          
          <form className='register-form' onSubmit={handleLogin}>
            
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input 
                type="email"
                id="email" 
                name="email"
                placeholder=''
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className='form-group'>
              <label htmlFor='senha'>Senha:</label>
              <input 
                type="password" 
                id="senha" 
                name="password"
                placeholder='' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            {/* Mensagem de erro */}
            {error && <p className="form-error">{error}</p>}

            <button type="submit" className='button'>
              Entrar
            </button>
          </form>
          
          <Link to="/register" className='form-link'>Criar nova conta</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;