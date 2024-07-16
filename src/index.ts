// src/index.js
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import quizzesRouter from "../routes/quizzes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Add middleware for handling CORS requests from index.html
app.use(cors())

// Add middware for parsing request bodies here:
app.use(bodyParser.json())

// Middleware for logging
app.use(morgan('dev'))

app.use("/api/quizzes", quizzesRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});