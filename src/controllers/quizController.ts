import { Request, Response } from 'express';
import Quiz from '../models/Quiz';
import asyncHandler from "express-async-handler"
// Create a new quiz
export const createQuiz = asyncHandler(async (req: Request, res: Response) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
});

// Get all quizzes
export const getQuizzes = asyncHandler(async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
})

// Get a single quiz by ID
export const getQuizById = asyncHandler(async (req: Request, res: Response) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
      } else {
        res.status(200).json(quiz);
      }
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
    }
  });

// Update a quiz by ID
export const updateQuiz = asyncHandler(async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
});

// Delete a quiz by ID
export const deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
    res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
})
