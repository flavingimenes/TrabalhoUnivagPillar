import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

import { useTimedError } from '../../hooks/useTimedError';

// Seus imports de CSS e logo
import './form.css';
import './logo.css';
import logoPillar from '../../assets/PillarLogo.png';
import WaveEmoji from '../../assets/Imgs/waving-hand_ios.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Hook de erro temporizado
  const [error, setError] = useTimedError(5000);

  const navigate = useNavigate();

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

      // --- CORREÇÃO AQUI ---
      localStorage.setItem('token', data.token);
      
      // ADICIONADO: Salvando o ID do usuário. Sem isso, a página de perfil trava.
      localStorage.setItem('userId', data.userId); 
      
      // Opcional: Se quiser usar o foco acadêmico em algum lugar do front depois
      if (data.academicFocus) {
        localStorage.setItem('academicFocus', data.academicFocus);
      }
      // ---------------------

      navigate('/home');

    } catch (err) {
      setError(err.message); 
      console.error('Erro no login:', err);
    }
  };

  return (
    <div className='register-container'>

      {/* PAINEL ESQUERDO (BRANDING) */}
      <div className='register-branding-panel'>
        <div className='branding-content'>
          
          <h2>Bem-vindo de volta ao Pillar <img src={WaveEmoji} alt="wave-emoji" style={{ height: '35px', display: 'inline', marginLeft: '5px' }} /></h2>
          <p>
            Acesse sua conta e continue construindo
            seu futuro.
          </p>
          
          <div className='testimonial-card'>
            <p className='testimonial-text'>
              "Quase não precisei fazer nada. Adorei a experiência. Configurei meus estudos, e cuidaram de todos os detalhes necessários em segundos. Recomendo com certeza!"
            </p>
            <div className='testimonial-author'>
              <img src="https://cdn.motor1.com/images/mgl/VPzrl/s1/1x1/davidson-sportster-s---midnight-crimson-main.webp" alt="Catherine Johns" />
              <span>Dhiogo Nascimento</span>
            </div>
          </div>
          <h3>&copy; 2025 Pillar.</h3>
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
          <h2>Bem vindo de volta! <img src={WaveEmoji} alt="wave-emoji" style={{ height: '20px', display: 'inline', marginLeft: '5px' }} /></h2>
          
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