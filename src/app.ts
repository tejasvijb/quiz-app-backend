import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import quizRoutes from './routes/quizRoutes';
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import connectDb from './config/dbConnection';
import userRoutes from './routes/userRoutes';


dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'https://quiz-app-flame-mu.vercel.app/', // Replace with your frontend's domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
    allowedHeaders: 'Content-Type, Authorization',
  };

// use dot env

// Add middleware for handling CORS requests from index.html
app.use(cors(corsOptions))

// Add middware for parsing request bodies here:
app.use(bodyParser.json())

// Middleware for logging
app.use(morgan('dev'))

app.use('/api', quizRoutes);
app.use('/api/users', userRoutes)
app.use(errorHandler)

connectDb()


export default app;
