import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Activities.css";
import SideBar from '../../components/SideBar';
import HeaderImg from '../../assets/Imgs/bookBackground.jpg';
import { subjects } from '../../utils/quizData'; 

const Activities = () => {
  const navigate = useNavigate();

  return (
    <div className='activities-page-root'>
      <SideBar />
      <div className='activities-main-content'>
        <header className='activities-header-container'>
          <div className="activities-header-overlay">
            <h1>Área de Treino</h1>
            <p>Escolha uma matéria e teste seus conhecimentos com a BNCC</p>
          </div>
          <img src={HeaderImg} alt="HeaderImg" className='activities-header-bg-img' />
        </header>
        
        <div className="activities-subjects-grid">
          {subjects.map((subject) => (
            <div 
              key={subject.id} 
              className="activities-card-item" 
              onClick={() => navigate(`/quiz/${subject.id}`)}
            >
              <div className="activities-card-icon">{subject.icon}</div>
              <div className="activities-card-details">
                <h3>{subject.name}</h3>
                <span>10 Questões</span>
              </div>
              <div className="activities-card-arrow">➜</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Activities;