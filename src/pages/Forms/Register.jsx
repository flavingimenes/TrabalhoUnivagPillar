// Importamos o 'useEffect'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Importe seu CSS atualizado
import './form.css';
import logoPillar from '../../assets/PillarLogo.png';
import BookIos from '../../assets/Imgs/books_ios.png'


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  // Sua função 'handleSubmit' (sem alterações na lógica)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
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
      }, 2000);

    } catch (err) {
      setError(err.message);
      console.error('Erro no registro:', err);
    }
  };

  return (
    // O container principal agora é o split-screen
    <div className='register-container'>

      {/* PAINEL ESQUERDO (BRANDING) */}
      <div className='register-branding-panel'>
        <div className='branding-content'>

          {/* Texto atualizado para login */}
          <h2>Bem-vindo ao Pillar <img src={BookIos} alt="wave-emoji" style={{ height: '35px', display: 'inline', marginLeft: '5px' }} /></h2>
          <p>
            Crie uma conta e descubra um mundo sem complicações para o seu estudo.
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
          <h1>Registrar Conta</h1>
          <h2>Bem vindo ao Pillar! <img src={BookIos} alt="wave-emoji" style={{ height: '20px', display: 'inline', marginLeft: '5px' }} /></h2>

          <form className='register-form' onSubmit={handleSubmit}>

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

            {/* Criamos uma linha para colocar os campos lado a lado */}
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='senha'>Senha:</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder=''
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className='form-group'>
                <label htmlFor='confirmSenha'>Confirmar Senha:</label>
                <input
                  type="password"
                  id="confirmSenha"
                  name="confirmSenha"
                  placeholder=''
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Mensagens de feedback */}
            {error && <p className="form-error">{error}</p>}
            {successMessage && <p className="form-success">{successMessage}</p>}

            <button type="submit" className="button">
              Cadastrar
            </button>
          </form>

          <Link to="/" className='form-link'>Já possui conta?</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;