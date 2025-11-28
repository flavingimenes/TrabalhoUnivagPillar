const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');

// Rota 1: Busca todas as matérias
// URL final: /api/subjects
router.get('/subjects', quizController.getSubjects);

// Rota 2: Busca questões de uma matéria específica
// CORREÇÃO: Mudamos de '/questions' para '/quiz' para bater com o seu Front-end
// URL final: /api/quiz/artes (ou /api/quiz/1)
router.get('/quiz/:subjectId', quizController.getQuestionsBySubject);

// Rota 3: Salva o resultado
// URL final: /api/save-result
router.post('/save-result', quizController.saveQuizResult);

// Rota 4: Histórico do usuário
// URL final: /api/history/:userId
router.get('/history/:userId', quizController.getQuizHistory);

module.exports = router;