import express from 'express';
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz
} from '../controllers/quizController';

const router = express.Router();

router.post('/quizzes', createQuiz);
router.get('/quizzes', getQuizzes);
router.get('/quizzes/:id', getQuizById);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);

export default router;
