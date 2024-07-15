// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import quizzesRouter from "../routes/quizzes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use("/api/quizzes", quizzesRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});