import { Schema, model, Document } from 'mongoose';

interface IOption {
  text: string;
  isCorrect: boolean;
}

interface IQuestion {
  text: string;
  options: IOption[];
}

interface IQuiz extends Document {
  title: string;
  description: string;
  imageUrl: string;
  questions: IQuestion[];
}

const OptionSchema = new Schema<IOption>({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const QuestionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  options: { type: [OptionSchema], required: true }
});

const QuizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  questions: { type: [QuestionSchema], required: true }
});

const Quiz = model<IQuiz>('Quiz', QuizSchema);

export default Quiz;
