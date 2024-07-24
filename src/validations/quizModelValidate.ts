import { z } from 'zod';

// Define the schema for IOption
const optionSchema = z.object({
    text: z.string().min(1, 'Option text is required'),
    isCorrect: z.boolean(),
  });
  
  // Define the schema for IQuestion
  const questionSchema = z.object({
    text: z.string().min(1, 'Question text is required'),
    options: z.array(optionSchema).min(2, 'At least two options are required'),
  });
  
  // Define the schema for IQuiz
const quizSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    imageUrl: z.string().min(1,'Image URL is required').url('Invalid URL'),
    questions: z.array(questionSchema).nonempty('At least one question is required'),
  });


export default quizSchema;

