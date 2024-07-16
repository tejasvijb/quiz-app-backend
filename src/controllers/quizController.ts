import { Request, Response } from 'express';
import Quiz from '../models/Quiz';

// Create a new quiz
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

// Get all quizzes
export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

// Get a single quiz by ID
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

// Update a quiz by ID
export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

// Delete a quiz by ID
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
