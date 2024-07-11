// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Questions, Quizzes } from "./db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/quizzes", (req: Request, res: Response) => {
  res.send({ data: Quizzes })
});

app.get('/quizzes/:id', (req, res) => {
    const quizId = req.params.id;
    const quiz = Quizzes.find(q => q.id === quizId);
  
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
});

app.get('/quizzes/:id/questions', (req, res) => {
    const quizId = req.params.id;
    const quiz = Quizzes.find(q => q.id === quizId);

    if (quiz) {
      res.json(Questions);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});