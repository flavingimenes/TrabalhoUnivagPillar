import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Activities.css"; 
// Mantendo seus imports originais baseados no seu log de erro
import SideBar from '../../components/SideBar';
import HeaderImg from '../../assets/Imgs/bookBackground.jpg';

const Activities = () => {
  const navigate = useNavigate();

  // Estados
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar matérias do Banco de Dados
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/subjects');
        
        if (!response.ok) throw new Error('Erro ao buscar matérias');
        
        const data = await response.json();
        setSubjects(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível conectar ao servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className='activities-page-root'>
      <SideBar />
      <div className='activities-main-content'>
        
        <header>
          <img src={HeaderImg} alt="HeaderImg" className='activities-header-bg-img' />
        </header>
        <div className='header-text-main'>
            <h1>
              Atividades
            </h1>
            <h3>
              Esta seção de atividades das grades curriculares do Ensino Médio contem as principais habilidades e competências a serem desenvolvidas em cada matéria, seguindo a Base Nacional Curricular <a href="https://basenacionalcomum.mec.gov.br/abase" target='blank'>(BNCC)</a>
            </h3>
          </div>
        
        {/* Loading Spinner Simples com CSS */}
        {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                <div className="simple-spinner" style={{ 
                    width: '40px', 
                    height: '40px', 
                    border: '4px solid #f3f3f3', 
                    borderTop: '4px solid #3498db', 
                    borderRadius: '50%', 
                    animation: 'spin 1s linear infinite' 
                }}></div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        )}

        {/* Mensagem de Erro */}
        {error && (
            <div style={{ padding: '20px', color: '#dc2626', textAlign: 'center', backgroundColor: '#fee2e2', borderRadius: '8px', margin: '20px' }}>
                ⚠️ {error}
            </div>
        )}

        {/* Grid de Matérias */}
        {!loading && !error && (
            <div className="activities-subjects-grid">
            {subjects.map((subject) => (
                <div 
                key={subject.id} 
                className="activities-card-item" 
                onClick={() => navigate(`/quiz/${subject.id}`)}
                >
                <div className="activities-card-icon" style={{ fontSize: '2.5rem' }}>
                    {subject.icon} {/* O ícone vem do banco como Emoji */}
                </div>
                <div className="activities-card-details">
                    <h3>{subject.name}</h3>
                    <span>Quiz Geral</span> 
                </div>
                <div className="activities-card-arrow">➜</div>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}

export default Activities;