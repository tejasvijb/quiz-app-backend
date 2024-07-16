import express, { Express, Request, Response } from "express";
import { Questions, Quizzes } from "../src/db";

const quizzesRouter = express.Router()



// write api for "/" return a empty json
quizzesRouter.get("/", (req: Request, res: Response) => {
    res.send({ data: Quizzes })
})

quizzesRouter.get("/:id", (req: Request, res: Response) => {
    const quizId = req.params.id;
    const quiz = Quizzes.find(q => q.id === quizId);
  
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
})

quizzesRouter.get('/:id/questions', (req, res) => {
    const quizId = req.params.id;
    const quiz = Quizzes.find(q => q.id === quizId);

    if (quiz) {
      res.json(Questions);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
});
  

export default quizzesRouter