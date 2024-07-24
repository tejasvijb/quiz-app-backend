import { Request, Response } from 'express';
import Quiz from '../models/Quiz';
import asyncHandler from "express-async-handler"
import quizSchema from '../validations/quizModelValidate';
// Create a new quiz
export const createQuiz = asyncHandler(async (req: Request, res: Response, next) => {

    const parsedData = quizSchema.safeParse(req.body);
    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map(err => {
        const path = err.path?.join('.');
        return `${path}: ${err.message}`;
      });
      next(new Error(errorMessages.join(', ')));
      
    }
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);

});

// Get all quizzes
export const getQuizzes = asyncHandler(async (req: Request, res: Response) => {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);

})

// Get a single quiz by ID
export const getQuizById = asyncHandler(async (req: Request, res: Response, next) => {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
      } else {
        res.status(200).json(quiz);
      }

  });

// Update a quiz by ID
export const updateQuiz = asyncHandler(async (req: Request, res: Response, next) => {
    const parsedData = quizSchema.safeParse(req.body);
    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map(err => {
        const path = err.path?.join('.');
        return `${path}: ${err.message}`;
      });
      next(new Error(errorMessages.join(', ')));
      
    }
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);

});

// Delete a quiz by ID
export const deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
    res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });

})
