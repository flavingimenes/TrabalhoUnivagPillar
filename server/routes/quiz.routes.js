const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');

// Rota 1: Busca todas as matérias (/api/subjects)
router.get('/subjects', quizController.getSubjects);

// Rota 2: Busca questões de uma matéria específica (/api/quiz/:id)
router.get('/quiz/:subjectId', quizController.getQuestionsBySubject);

// --- NOVA ROTA AQUI ---
// URL final: /api/quiz/generate
// Recebe os tópicos errados e gera novas questões
router.post('/quiz/generate', quizController.generateReinforcement); 
// ----------------------

// Rota 3: Salva o resultado (/api/save-result)
router.post('/save-result', quizController.saveQuizResult);

// Rota 4: Histórico do usuário (/api/history/:userId)
router.get('/history/:userId', quizController.getQuizHistory);

module.exports = router;