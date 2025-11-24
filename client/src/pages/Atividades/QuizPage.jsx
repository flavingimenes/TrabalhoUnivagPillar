import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizzes, subjects } from '../../utils/quizData.js';
import SideBar from '../../components/SideBar';
import './QuizPage.css';

const QuizPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  
  const questions = quizzes[subjectId] || [];
  const subjectInfo = subjects.find(s => s.id === subjectId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  // --- Renderização: Estado Vazio (Sem perguntas) ---
  if (questions.length === 0) {
    return (
        <div className='qp-root-container'>
            <SideBar />
            <div className='qp-main-layout'>
                <div className='qp-empty-state' style={{padding: '20px'}}>
                    <h2>{subjectInfo?.name}</h2>
                    <p>As atividades desta matéria serão adicionadas em breve!</p>
                    <button className="qp-btn-primary" onClick={() => navigate('/activities')}>Voltar</button>
                </div>
            </div>
        </div>
    )
  }

  const handleAnswerOptionClick = (selectedOption) => {
    const answerObject = {
        questionId: questions[currentQuestionIndex].id,
        questionText: questions[currentQuestionIndex].question,
        selected: selectedOption,
        correct: questions[currentQuestionIndex].correctAnswer,
        isCorrect: selectedOption === questions[currentQuestionIndex].correctAnswer,
        topic: questions[currentQuestionIndex].topic,
        explanation: questions[currentQuestionIndex].explanation
    };

    const nextAnswers = [...userAnswers, answerObject];
    setUserAnswers(nextAnswers);

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const getStudyRecommendations = () => {
    const wrongAnswers = userAnswers.filter(a => !a.isCorrect);
    const topicCounts = {};
    wrongAnswers.forEach(a => {
        topicCounts[a.topic] = (topicCounts[a.topic] || 0) + 1;
    });
    return Object.keys(topicCounts);
  };

  return (
    <div className='qp-root-container'>
      <SideBar />
      <div className='qp-main-layout'>
        
        {/* --- Renderização: Resultados --- */}
        {showResult ? (
          <div className="qp-result-view fade-in">
            <div className="qp-score-header">
               <div className="qp-score-circle">
                  <span>{userAnswers.filter(a => a.isCorrect).length}</span>
                  <small>/ {questions.length}</small>
               </div>
               <h2>Relatório de Desempenho</h2>
            </div>

            {getStudyRecommendations().length > 0 && (
                <div className="qp-recommendation-box">
                    <h4>📚 Foco de Estudo Sugerido:</h4>
                    <div className="qp-tags-wrapper">
                        {getStudyRecommendations().map((topic, index) => (
                            <span key={index} className="qp-topic-tag">{topic}</span>
                        ))}
                    </div>
                </div>
            )}

            <div className="qp-answers-list">
                {userAnswers.map((ans, index) => (
                    // Adicionada classe condicional específica: qp-card-correct ou qp-card-wrong
                    <div key={index} className={`qp-answer-card ${ans.isCorrect ? 'qp-card-correct' : 'qp-card-wrong'}`}>
                        <div className="qp-card-header">
                          <strong>Questão {index + 1}</strong>
                          <span className="qp-status-badge">{ans.isCorrect ? 'Acertou' : 'Errou'}</span>
                        </div>
                        <p className="qp-question-text">{ans.questionText}</p>
                        
                        <p className="qp-selected-text">
                            <strong>Sua resposta:</strong> {ans.selected}
                        </p>
                        
                        {!ans.isCorrect && (
                            <div className="qp-correction-box">
                                <p><strong>Correta:</strong> {ans.correct}</p>
                                <p className="qp-explanation">{ans.explanation}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <button className="qp-btn-primary" onClick={() => navigate('/atividades')}>Concluir Revisão</button>
          </div>
        ) : (
          /* --- Renderização: Quiz Ativo (Pergunta Atual) --- */
          <div className="qp-active-view fade-in">
            <div className="qp-progress-header">
                <button className="qp-btn-back" onClick={() => navigate('/atividades')}>✕ Sair</button>
                <div className="qp-progress-bg">
                    <div 
                        className="qp-progress-fill" 
                        style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}
                    ></div>
                </div>
                <span className="qp-progress-text">{currentQuestionIndex + 1}/{questions.length}</span>
            </div>

            <div className="qp-question-container">
                <span className="qp-topic-badge">{subjectInfo?.name}</span>
                <h2 className="qp-question-title">{questions[currentQuestionIndex].question}</h2>
                
                <div className="qp-options-grid">
                {questions[currentQuestionIndex].options.map((option, index) => (
                    <button 
                        key={index} 
                        className="qp-option-btn"
                        onClick={() => handleAnswerOptionClick(option)}
                    >
                    {option}
                    </button>
                ))}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;