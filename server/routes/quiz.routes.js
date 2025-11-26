const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');

router.get('/subjects', quizController.getSubjects);
router.get('/:subjectId', quizController.getQuestionsBySubject);
router.post('/save-result', quizController.saveQuizResult);
router.get('/history/:userId', quizController.getQuizHistory);

module.exports = router;
