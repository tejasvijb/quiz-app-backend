import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import quizRoutes from './routes/quizRoutes';
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from 'cors';


dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

// use dot env

// Add middleware for handling CORS requests from index.html
app.use(cors())

// Add middware for parsing request bodies here:
app.use(bodyParser.json())

// Middleware for logging
app.use(morgan('dev'))

app.use('/api', quizRoutes);

mongoose.connect(process.env.MONGO_URI || '' ).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error.message);
});


export default app;
