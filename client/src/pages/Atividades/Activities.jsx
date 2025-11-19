// 1. CORREÇÃO: Importamos o 'useState' juntamente com o 'React'
import React, { useState } from 'react';

// 2. OTIMIZAÇÃO: Removemos a importação do "Activities.css" pois os estilos já estão no componente <QuizStyles />
// import "./Activities.css" 

import SideBar from '../../components/SideBar';
import HeaderImg from '../../assets/Imgs/bookBackground.jpg';

// Substitua o array 'quizData' antigo por este:
const quizData = [
  {
    question: "A Revolta da Vacina (1904), ocorrida no Rio de Janeiro, foi um motim popular que, apesar do nome, não foi causado apenas pela vacinação obrigatória. Qual outro fator social foi determinante para a revolta?",
    options: [
      "O aumento do preço dos alimentos básicos.",
      "A proibição das festas de Carnaval na cidade.",
      "As reformas urbanas que demoliram cortiços e desalojaram a população pobre.",
      "A falta de médicos nos postos de saúde."
    ],
    correctAnswer: "As reformas urbanas que demoliram cortiços e desalojaram a população pobre.",
    improvementTopic: "Ciências Humanas: História do Brasil"
  },
  {
    question: "Na frase: 'Aquele político é uma raposa'. A palavra 'raposa' está a ser usada em qual sentido?",
    options: [
      "Sentido Literal (Denotativo), referindo-se ao animal.",
      "Sentido Figurado (Conotativo), indicando astúcia.",
      "Como um erro de gramática, pois 'raposa' é feminino.",
      "Como uma hipérbole (exagero)."
    ],
    correctAnswer: "Sentido Figurado (Conotativo), indicando astúcia.",
    improvementTopic: "Linguagens: Semântica e Figuras de Linguagem"
  },
  {
    question: "A fotossíntese é um processo crucial para a vida na Terra. As plantas utilizam luz solar, água e CO2 para produzir seu próprio alimento. Quais são os dois produtos finais principais deste processo?",
    options: [
      "Água e Oxigénio (O2)",
      "Glicose (C6H12O6) e Oxigénio (O2)",
      "Dióxido de Carbono (CO2) e Água",
      "Nitrogénio (N2) e Glicose (C6H12O6)"
    ],
    correctAnswer: "Glicose (C6H12O6) e Oxigénio (O2)",
    improvementTopic: "Ciências da Natureza: Biologia"
  },
  {
    question: "Uma loja de eletrodomésticos oferece um desconto de 15% para pagamento à vista. Se uma televisão custa R$ 2.000,00, quanto o cliente pagará se comprar à vista?",
    options: [
      "R$ 1.700,00",
      "R$ 1.850,00",
      "R$ 1.985,00",
      "R$ 300,00"
    ],
    correctAnswer: "R$ 1.700,00",
    improvementTopic: "Matemática: Porcentagem"
  },
  {
    question: "O conceito de 'Indústria Cultural', desenvolvido pelos filósofos Adorno e Horkheimer (Escola de Frankfurt), critica principalmente:",
    options: [
      "A produção artesanal de bens culturais.",
      "A falta de acesso à cultura pela classe trabalhadora.",
      "A transformação da arte e da cultura em mercadorias de consumo de massa.",
      "O financiamento público de museus e teatros."
    ],
    correctAnswer: "A transformação da arte e da cultura em mercadorias de consumo de massa.",
    improvementTopic: "Ciências Humanas: Filosofia/Sociologia"
  },
  {
    question: "Qual das seguintes fontes de energia é considerada NÃO renovável e é a principal responsável pela intensificação do efeito estufa?",
    options: [
      "Energia Eólica",
      "Energia Solar",
      "Energia Hidrelétrica",
      "Combustíveis FósseIS (Carvão, Petróleo)"
    ],
    correctAnswer: "Combustíveis FósseIS (Carvão, Petróleo)",
    improvementTopic: "Ciências da Natureza: Química/Geografia"
  },
  {
    question: "O movimento literário que surgiu no Brasil durante a Semana de Arte Moderna de 1922, propondo uma rutura com o passado e a busca por uma identidade nacional, foi o:",
    options: [
      "Romantismo",
      "Realismo",
      "Parnasianismo",
      "Modernismo"
    ],
    correctAnswer: "Modernismo",
    improvementTopic: "Linguagens: Literatura Brasileira"
  },
  {
    question: "Ao soltar um objeto, ele cai em direção ao chão. Ao chutar uma bola, ela eventualmente para. Qual lei da física fundamental explica a tendência de um objeto em movimento permanecer em movimento, ou um objeto em repouso permanecer em repouso, a menos que uma força atue sobre ele?",
    options: [
      "Lei da Gravitação Universal",
      "Princípio da Inércia (1ª Lei de Newton)",
      "Princípio da Ação e Reação (3ª Lei de Newton)",
      "Lei de Ohm"
    ],
    correctAnswer: "Princípio da Inércia (1ª Lei de Newton)",
    improvementTopic: "Ciências da Natureza: Física"
  },
  {
    question: "Um carro consome 1 litro de gasolina para percorrer 12 km. Quantos litros de gasolina serão necessários para uma viagem de 480 km?",
    options: [
      "30 litros",
      "35 litros",
      "40 litros",
      "45 litros"
    ],
    correctAnswer: "40 litros",
    improvementTopic: "Matemática: Razão e Proporção"
  },
  {
    question: "A urbanização acelerada no Brasil a partir da década de 1960, sem o devido planeamento, teve como uma de suas principais consequências sociais nas grandes cidades:",
    options: [
      "A melhoria da qualidade do ar.",
      "A eliminação da pobreza rural.",
      "O crescimento de áreas periféricas e moradias precárias (favelização).",
      "A distribuição equilibrada de serviços públicos."
    ],
    correctAnswer: "O crescimento de áreas periféricas e moradias precárias (favelização).",
    improvementTopic: "Ciências Humanas: Geografia Urbana"
  }
];

const QuizStyles = () => (
  <style>
    {`
    /* 4. OTIMIZAÇÃO: Removemos os estilos de '.sidebar-placeholder' que não estavam a ser usados */
    
    /* --- Estilos da sua página (Activities.css) --- */
    .root-home {
        display: flex;
        height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .main-div {
        overflow-y: auto;
        background-color: #f3f4f6;
    }

    /* ... (todo o resto do seu CSS está perfeito e permanece igual) ... */
    
    .main-div header {
        position: relative;
        height: 30vh;
        width: 100%;
        background-color: #374151;
}

    .main-div h2 {
        text-align: center;
        font-size: 2.25rem;
        font-weight: 700;
        color: #1f2937;
        margin: 1.5rem 0;
        text-transform: uppercase;
    }

    .quiz-content-area {
        padding: 1rem 1.5rem;
    }

    .quiz-container,
    .results-container {
        max-width: 896px;
        margin: 1.5rem auto;
        background-color: #ffffff;
        padding: 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    @media (min-width: 768px) {
        .quiz-container,
        .results-container {
            padding: 2rem;
        }
    }

    .quiz-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: #1f2937;
    }

    .question-list {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .question-block {
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 1.5rem;
    }

    .question-text {
        font-size: 1.125rem;
        font-weight: 500;
        color: #111827;
        margin-bottom: 1rem;
    }

    .options-container {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .option-label {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 2px solid #e5e7eb;
        background-color: #f9fafb;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .option-label:hover {
        background-color: #f3f4f6;
    }

    .option-label.selected {
        background-color: #eff6ff;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px #dbeafe;
    }

    .option-label input[type="radio"] {
        width: 1.25rem;
        height: 1.25rem;
        color: #2563eb;
    }

    .option-label span {
        margin-left: 0.75rem;
        font-size: 1rem;
        color: #374151;
    }

    .submit-button,
    .reset-button {
        width: 100%;
        margin-top: 2rem;
        padding: 0.75rem 1.5rem;
        background-color: #2563eb;
        color: white;
        font-size: 1.125rem;
        font-weight: 600;
        border: none;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .submit-button:hover {
        background-color: #1d4ed8;
    }

    .submit-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .disabled-message {
        text-align: center;
        font-size: 0.875rem;
        color: #6b7280;
        margin-top: 0.75rem;
    }

    .results-title {
        font-size: 1.875rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        text-align: center;
        color: #1f2937;
    }

    .score-box {
        text-align: center;
        margin-bottom: 2rem;
        padding: 1.5rem;
        background-color: #eff6ff;
        border-radius: 0.5rem;
        border: 1px solid #bfdbfe;
    }

    .score-box p:first-child {
        font-size: 1.25rem;
        color: #1e40af;
    }

    .score-box .score-text {
        font-size: 3.75rem;
        font-weight: 700;
        color: #2563eb;
        margin: 0.5rem 0;
    }

    .score-box p:last-child {
        font-size: 1.125rem;
        color: #1d4ed8;
    }

    .improvement-box {
        margin-bottom: 2rem;
        padding: 1.25rem;
        background-color: #fffbeb;
        border-left: 4px solid #f59e0b;
        border-radius: 0 0.5rem 0.5rem 0;
    }

    .improvement-box h4 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: #b45309;
    }

    .improvement-box ul {
        list-style-position: inside;
        list-style-type: disc;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        color: #b45309;
        font-size: 1rem;
    }

    .review-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        border-top: 1px solid #e5e7eb;
        padding-top: 1.5rem;
        color: #1f2937;
    }

    .review-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .review-item {
        padding: 1rem;
        border-radius: 0.5rem;
        border-left-width: 4px;
    }

    .review-item.correct {
        background-color: #f0fdf4;
        border-color: #22c55e;
    }

    .review-item.incorrect {
        background-color: #fef2f2;
        border-color: #ef4444;
    }

    .review-question {
        font-size: 1.125rem;
        font-weight: 500;
        color: #111827;
        margin-bottom: 0.5rem;
    }

    .review-answer {
        font-size: 1rem;
        color: #374151;
    }

    .review-item.incorrect .review-answer {
        text-decoration: line-through;
    }

    .review-answer span {
        font-weight: 600;
    }

    .review-answer .correct-check {
        margin-left: 0.5rem;
        color: #15803d;
        font-weight: 700;
    }

    .review-correct-answer {
        font-size: 1rem;
        color: #14532d;
        font-weight: 600;
    }

    .reset-button {
        margin-top: 2.5rem;
        background-color: #4b5563;
    }

    .reset-button:hover {
        background-color: #374151;
    }
    `}
  </style>
);

const Activities = () => {
  // O seu state e as suas funções de lógica estão perfeitas!
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(quizData.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (questionIndex, option) => {
    if (showResults) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = option;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers(new Array(quizData.length).fill(null));
    setShowResults(false);
  };

  let score = 0;
  const improvementTopics = new Set();

  if (showResults) {
    quizData.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score++;
      } else {
        improvementTopics.add(question.improvementTopic);
      }
    });
  }

  const allAnswered = selectedAnswers.every(answer => answer !== null);

  return (
    // Usamos React.Fragment para agrupar os estilos e o app
    <React.Fragment>
      <QuizStyles /> {/* Injeta todos os estilos na página */}

      <div className='root-home'>
        <SideBar />
        <div className='main-div'>
          <header>
            <img
              src={HeaderImg}
              alt="HeaderImg"
              className='header-img'
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </header>
          <h2>ATIVIDADES</h2>

          <div className="quiz-content-area">
            {!showResults ? (
              <div className="quiz-container">
                <h3 className="quiz-title">Quiz de questões já usadas no ENEM </h3>
                <div className="question-list">
                  {quizData.map((item, index) => (
                    <div key={index} className="question-block">
                      <p className="question-text">{index + 1}. {item.question}</p>
                      <div className="options-container">
                        {item.options.map((option, optIndex) => (
                          <label
                            key={optIndex}
                            className={`option-label ${selectedAnswers[index] === option ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option}
                              checked={selectedAnswers[index] === option}
                              onChange={() => handleOptionSelect(index, option)}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSubmit}
                  className="submit-button"
                  disabled={!allAnswered}
                >
                  Verificar Respostas
                </button>
                {!allAnswered && (
                  <p className="disabled-message">Por favor, responda todas as perguntas para continuar.</p>
                )}
              </div>
            ) : (
              <div className="results-container">
                <h3 className="results-title">Resultados do Quiz</h3>
                <div className="score-box">
                  <p>Você acertou</p>
                  <p className="score-text">{score} / {quizData.length}</p>
                  <p>{score > 7 ? "Excelente!" : (score > 4 ? "Bom trabalho!" : "Continue estudando!")}</p>
                </div>
                {improvementTopics.size > 0 && (
                  <div className="improvement-box">
                    <h4>Pontos a Melhorar:</h4>
                    <ul>
                      {[...improvementTopics].map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                      <button
                  onClick={handleReset}
                  className="reset-button"
                >
                  Gerar atividades relacionadas!
                </button>
                    </ul>
                  </div>
                )}
                <h4 className="review-title">Revisão das Respostas</h4>
                <div className="review-list">
                  {quizData.map((item, index) => {
                    const isCorrect = selectedAnswers[index] === item.correctAnswer;
                    return (
                      <div
                        key={index}
                        className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}
                      >
                        <p className="review-question">{index + 1}. {item.question}</p>
                        <p className="review-answer">
                          Sua resposta: <span>{selectedAnswers[index] || "Não respondida"}</span>
                          {isCorrect && <span className="correct-check"> ✓</span>}
                        </p>
                        {!isCorrect && (
                          <p className="review-correct-answer">Resposta correta: {item.correctAnswer}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={handleReset}
                  className="reset-button"
                >
                  Tentar Novamente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Activities;