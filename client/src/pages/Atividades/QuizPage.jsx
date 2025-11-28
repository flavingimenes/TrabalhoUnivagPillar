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
  
  // Estado para controlar o loading do botão de gerar novas atividades
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
        
        // 1. Busca as perguntas da matéria específica (O Backend limita a 20)
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

  // --- FUNÇÃO PARA VOLTAR QUESTÃO ---
  const handlePreviousStep = () => {
    if (currentQuestionIndex > 0) {
      // 1. Volta o índice visual
      setCurrentQuestionIndex(prev => prev - 1);
      
      // 2. Remove a resposta anterior do array de respostas
      setUserAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers.pop(); 
        return newAnswers;
      });
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

  // --- FUNÇÃO DE FEEDBACK DE NOTA ---
  const getPerformanceFeedback = () => {
    const score = userAnswers.filter(a => a.isCorrect).length;
    const total = questions.length;
    if (total === 0) return { message: "", color: "#000" };

    const percentage = (score / total) * 100;

    if (percentage === 100) {
      return { title: "Perfeito! 🌟", message: "Você dominou totalmente este conteúdo!", color: "#16a34a" };
    } else if (percentage >= 80) {
      return { title: "Excelente! 🚀", message: "Quase gabaritou! Continue assim.", color: "#16a34a" };
    } else if (percentage >= 60) {
      return { title: "Muito Bom! 👍", message: "Você está no caminho certo.", color: "#ca8a04" };
    } else if (percentage >= 40) {
      return { title: "Bom esforço 💪", message: "Mas vale a pena revisar alguns pontos.", color: "#d97706" };
    } else {
      return { title: "Vamos revisar? 📚", message: "Use o botão abaixo para reforçar o conteúdo.", color: "#dc2626" };
    }
  };

  // --- FUNÇÃO: GERAR REFORÇO (ESTUDO SUGERIDO) ---
  const handleGenerateReinforcement = async () => {
    const weakTopics = getStudyRecommendations();
    
    if (weakTopics.length === 0) {
        alert("Parabéns! Você acertou tudo, não há necessidade de reforço imediato.");
        return;
    }

    try {
        setIsGenerating(true);

        // Pega IDs atuais para evitar repetição imediata
        const currentIds = questions.map(q => q.id);

        const response = await fetch('http://localhost:3001/api/quiz/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subjectId: subjectId,
                topics: weakTopics, 
                count: 10, // <--- AQUI ESTÁ O LIMITE DE 10 QUESTÕES PARA O REFORÇO
                excludeIds: currentIds 
            })
        });

        if (!response.ok) throw new Error('Falha ao gerar novas atividades');

        const newQuestionsData = await response.json();

        if (newQuestionsData.length === 0) {
             alert("Não há mais questões disponíveis para estes tópicos no momento.");
             return;
        }

        const mappedNewQuestions = newQuestionsData.map(q => ({
            id: q.id,
            question: q.question_text,
            options: q.options,
            correctAnswer: q.correct_answer,
            topic: q.topic,
            explanation: q.explanation
        }));

        setQuestions(mappedNewQuestions);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setShowResult(false);
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

  // --- RENDERIZAÇÃO VAZIA ---
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
               
               {/* --- FEEDBACK DINÂMICO --- */}
               {(() => {
                    const feedback = getPerformanceFeedback();
                    return (
                        <div style={{ marginTop: '10px', color: feedback.color }}>
                            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.4rem' }}>{feedback.title}</h3>
                            <p style={{ margin: 0, fontSize: '1rem', color: '#64748b' }}>{feedback.message}</p>
                        </div>
                    );
               })()}
               {/* ------------------------- */}
            </div>

            {getStudyRecommendations().length > 0 && (
                <div className="qp-recommendation-box">
                    <h4>📚 Foco de Estudo Sugerido:</h4>
                    <div className="qp-tags-wrapper">
                        {getStudyRecommendations().map((topic, index) => (
                            <span key={index} className="qp-topic-tag">{topic}</span>
                        ))}
                    </div>
                    
                    {/* Botão de Melhorar Conteúdo Sugerido */}
                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                        <button 
                            className="qp-btn-primary" 
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
            
            <div style={{marginTop: '20px'}}>
                <button className="qp-btn-primary" onClick={() => navigate('/atividades')}>Concluir Revisão</button>
            </div>
          </div>
        ) : (
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

                {/* BOTÃO DE VOLTAR */}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                    <button 
                        onClick={handlePreviousStep}
                        disabled={currentQuestionIndex === 0} 
                        style={{ 
                            background: 'transparent', 
                            border: '1px solid #ccc', 
                            color: '#666',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                            opacity: currentQuestionIndex === 0 ? 0 : 1, 
                            transition: 'opacity 0.2s',
                            visibility: currentQuestionIndex === 0 ? 'hidden' : 'visible'
                        }}
                    >
                        ⬅ Voltar questão
                    </button>
                </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;