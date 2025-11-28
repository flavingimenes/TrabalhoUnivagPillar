import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Activities.css"; 
import SideBar from '../../components/SideBar';
import HeaderImg from '../../assets/Imgs/bookBackground.jpg';

const Activities = () => {
  const navigate = useNavigate();

  // Estados principais
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para guardar o texto do foco do usuário
  const [userFocus, setUserFocus] = useState('Carregando...');

  // 1. Efeito para carregar e formatar o Foco do Usuário (localStorage)
  useEffect(() => {
    const rawFocus = localStorage.getItem('academicFocus');

    const formatFocus = (key) => {
      const map = {
        '1_ano': '1º Ano do Ensino Médio',
        '2_ano': '2º Ano do Ensino Médio',
        '3_ano': '3º Ano do Ensino Médio',
        'enem': 'Foco no ENEM'
      };
      return map[key] || 'Não definido';
    };

    if (rawFocus) {
      setUserFocus(formatFocus(rawFocus));
    } else {
      setUserFocus('Não definido');
    }
  }, []);

  // 2. Efeito para buscar matérias do Banco de Dados
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        // Essa URL agora está correta com o seu Back-end atualizado
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
              Esta seção de atividades das grades curriculares do Ensino Médio contem as principais habilidades e competências a serem desenvolvidas em cada matéria, seguindo a Base Nacional Curricular <a href="https://basenacionalcomum.mec.gov.br/abase" target='_blank' rel="noopener noreferrer">(BNCC)</a> e seu foco/ano letivo, que é: <strong style={{color: "black"}}>{userFocus}</strong>
              <br /><br />
              Logo abaixo, escolha uma matéria para iniciar um teste rápido com <strong>20 questões aleatórias!</strong> Depois de finalizar, você poderá ver seu desempenho e gerar reforço com base nos tópicos que teve mais dificuldade.
            </h3>
        </div>
        
        {/* Loading Spinner */}
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
                // IMPORTANTE: Isso vai enviar o ID (ex: 1, 2) para a URL. 
                // Sua página de Quiz deve estar preparada para receber um ID numérico.
                onClick={() => navigate(`/quiz/${subject.id}`)}
                >
                <div className="activities-card-icon" style={{ fontSize: '2.5rem' }}>
                    {subject.icon || '📚'} {/* Fallback caso o ícone venha vazio */}
                </div>
                <div className="activities-card-details">
                    <h3>{subject.name}</h3>
                    <span>Teste Rápido</span> 
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