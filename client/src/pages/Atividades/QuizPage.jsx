import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import './QuizPage.css';

const QuizPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  // Estados para dados do servidor
  const [questions, setQuestions] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // NOVO: Estado para controlar o loading do botão de gerar novas atividades
  const [isGenerating, setIsGenerating] = useState(false);

  // Estados do Jogo
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  // --- BUSCAR DADOS DO BANCO (MySQL/Node) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Busca as perguntas da matéria específica
        const responseQuiz = await fetch(`http://localhost:3001/api/quiz/${subjectId}`);
        if (!responseQuiz.ok) throw new Error('Erro ao buscar quiz');
        const dataQuiz = await responseQuiz.json();

        const mappedQuestions = dataQuiz.map(q => ({
            id: q.id,
            question: q.question_text,
            options: q.options,
            correctAnswer: q.correct_answer,
            topic: q.topic,
            explanation: q.explanation
        }));

        setQuestions(mappedQuestions);

        // 2. Busca o nome da matéria
        const responseSubjects = await fetch('http://localhost:3001/api/subjects');
        if (responseSubjects.ok) {
            const dataSubjects = await responseSubjects.json();
            const currentSubject = dataSubjects.find(s => s.id === subjectId);
            setSubjectName(currentSubject ? currentSubject.name : subjectId);
        }

      } catch (err) {
        console.error("Erro no fetch:", err);
        setError("Não foi possível carregar as atividades. Verifique a conexão com o servidor.");
      } finally {
        setLoading(false);
      }
    };

    if (subjectId) {
      fetchData();
    }
  }, [subjectId]);

  // --- LÓGICA DO QUIZ ---
  const handleAnswerOptionClick = (selectedOption) => {
    const currentQ = questions[currentQuestionIndex];
    const answerObject = {
        questionId: currentQ.id,
        questionText: currentQ.question,
        selected: selectedOption,
        correct: currentQ.correctAnswer,
        isCorrect: selectedOption === currentQ.correctAnswer,
        topic: currentQ.topic,
        explanation: currentQ.explanation
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

  // NOVO: Função para gerar novas atividades baseadas nos erros
  const handleGenerateReinforcement = async () => {
    const weakTopics = getStudyRecommendations();
    
    // Se não houver tópicos a melhorar, apenas retorna (ou mostra alerta)
    if (weakTopics.length === 0) {
        alert("Parabéns! Você acertou tudo, não há necessidade de reforço imediato.");
        return;
    }

    try {
        setIsGenerating(true);

        // Envia os tópicos fracos para o backend gerar novas questões
        // Nota: Você precisará criar essa rota '/api/quiz/generate' no seu Node/Express
        const response = await fetch('http://localhost:3001/api/quiz/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subjectId: subjectId,
                topics: weakTopics, // Envia ["Geometria", "Álgebra"] etc.
                count: 5 // Quantas questões novas você quer
            })
        });

        if (!response.ok) throw new Error('Falha ao gerar novas atividades');

        const newQuestionsData = await response.json();

        // Mapeia novamente os dados recebidos
        const mappedNewQuestions = newQuestionsData.map(q => ({
            id: q.id,
            question: q.question_text,
            options: q.options,
            correctAnswer: q.correct_answer,
            topic: q.topic,
            explanation: q.explanation
        }));

        // ATUALIZA O ESTADO PARA REINICIAR O QUIZ COM AS NOVAS PERGUNTAS
        setQuestions(mappedNewQuestions);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setShowResult(false);
        // Opcional: Scroll para o topo
        window.scrollTo(0, 0);

    } catch (err) {
        console.error("Erro ao gerar reforço:", err);
        alert("Erro ao gerar novas atividades. Tente novamente.");
    } finally {
        setIsGenerating(false);
    }
  };


  // --- RENDERIZAÇÃO DE CARREGAMENTO ---
  if (loading) {
    return (
        <div className='qp-root-container'>
            <SideBar />
            <div className='qp-main-layout' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Carregando atividades...</p>
            </div>
        </div>
    );
  }

  // --- RENDERIZAÇÃO DE ERRO ---
  if (error) {
    return (
        <div className='qp-root-container'>
            <SideBar />
            <div className='qp-main-layout' style={{ padding: '20px' }}>
                <h3>Ops!</h3>
                <p>{error}</p>
                <button className="qp-btn-primary" onClick={() => navigate('/atividades')}>Voltar</button>
            </div>
        </div>
    );
  }

  if (questions.length === 0) {
    return (
        <div className='qp-root-container'>
            <SideBar />
            <div className='qp-main-layout'>
                <div className='qp-empty-state' style={{padding: '20px'}}>
                    <h2>{subjectName}</h2>
                    <p>As atividades desta matéria serão adicionadas em breve!</p>
                    <button className="qp-btn-primary" onClick={() => navigate('/activities')}>Voltar</button>
                </div>
            </div>
        </div>
    )
  }

  return (
    <div className='qp-root-container'>
      <SideBar />
      <div className='qp-main-layout'>
        
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
                    
                    {/* NOVO: Botão de Melhorar Conteúdo Sugerido */}
                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                        <button 
                            className="qp-btn-primary" // Você pode criar uma classe qp-btn-ai se quiser diferenciar
                            style={{ backgroundColor: '#7c3aed', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}
                            onClick={handleGenerateReinforcement}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <><span>Gerando...</span></>
                            ) : (
                                <>
                                    <span>✨ Estudar conteúdo sugerido</span>
                                </>
                            )}
                        </button>
                    </div>

                </div>
            )}

            <div className="qp-answers-list">
                {userAnswers.map((ans, index) => (
                    <div key={index} className={`qp-answer-card ${ans.isCorrect ? 'qp-card-correct' : 'qp-card-wrong'}`}>
                        <div className="qp-card-header">
                          <strong>Questão {index + 1}</strong>
                          <span className="qp-status-badge">{ans.isCorrect ? 'Acertou' : 'Errou'}</span>
                        </div>
                        <p className="qp-question-text">{ans.questionText}</p>
                        
                        <p className="qp-selected-text">
                            <strong>Sua resposta:</strong> {ans.selected}
                        </p>
                        
                        <div 
                            className="qp-correction-box" 
                            style={{
                                marginTop: '10px',
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: ans.isCorrect ? '#f0fdf4' : 'rgba(254, 242, 242, 0.7)',
                                border: `1px solid ${ans.isCorrect ? '#bbf7d0' : '#fecaca'}`,
                                color: ans.isCorrect ? '#166534' : '#991b1b'
                            }}
                        >
                            {!ans.isCorrect && (
                                <p style={{marginBottom: '5px'}}>
                                    <strong>Correta:</strong> {ans.correct}
                                </p>
                            )}
                            
                            <p className="qp-explanation">
                                <strong>Justificativa:</strong> {ans.explanation}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Mantive o botão original, mas adicionei margem superior */}
            <div style={{marginTop: '20px'}}>
                <button className="qp-btn-primary" onClick={() => navigate('/atividades')}>Concluir Revisão</button>
            </div>
          </div>
        ) : (
          <div className="qp-active-view fade-in">
             {/* ... (Seu código original do quiz ativo permanece igual) ... */}
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
                <span className="qp-topic-badge">{subjectName || subjectId}</span>
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