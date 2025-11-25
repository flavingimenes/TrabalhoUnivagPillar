import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import './QuizPage.css'; // Mantendo seu CSS original

const QuizPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  // Estados para dados do servidor
  const [questions, setQuestions] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Mapeia os campos do Banco (snake_case) para o Front (camelCase)
        // Isso garante que o resto do seu código continue funcionando igual
        const mappedQuestions = dataQuiz.map(q => ({
            id: q.id,
            question: q.question_text,       // Banco: question_text -> Front: question
            options: q.options,              // Já vem como array (tratado no back)
            correctAnswer: q.correct_answer, // Banco: correct_answer -> Front: correctAnswer
            topic: q.topic,
            explanation: q.explanation
        }));

        setQuestions(mappedQuestions);

        // 2. Busca o nome da matéria (opcional, para exibir no título)
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
                <button className="qp-btn-primary" onClick={() => navigate('/activities')}>Voltar</button>
            </div>
        </div>
    );
  }

  // --- RENDERIZAÇÃO DE ESTADO VAZIO (Sem perguntas) ---
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

  // --- LÓGICA DO QUIZ (Original mantida) ---
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
                        
                        {/* Exibe sempre a resposta selecionada */}
                        <p className="qp-selected-text">
                            <strong>Sua resposta:</strong> {ans.selected}
                        </p>
                        
                        {/* Caixa de Justificativa aparece SEMPRE */}
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
                            {/* Se errou, mostra qual era a correta */}
                            {!ans.isCorrect && (
                                <p style={{marginBottom: '5px'}}>
                                    <strong>Correta:</strong> {ans.correct}
                                </p>
                            )}
                            
                            {/* Justificativa aparece sempre */}
                            <p className="qp-explanation">
                                <strong>Justificativa:</strong> {ans.explanation}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button className="qp-btn-primary" onClick={() => navigate('/atividades')}>Concluir Revisão</button>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;