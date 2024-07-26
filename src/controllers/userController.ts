import { Request, Response } from 'express';
import asyncHandler from "express-async-handler"
import { userSchema, UserType } from '../validations/userModelValidate';
import User from '../models/User';
import bcrypt from 'bcrypt'
// Create a new quiz
export const registerUser = asyncHandler(async (req: Request, res: Response, next) => {

    const body: UserType = req.body

    const parsedData = userSchema.safeParse(body);
    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map(err => {
        const path = err.path?.join('.');
        return `${path}: ${err.message}`;
      });
      next(new Error(errorMessages.join(', ')));
    }

    const userAvailable = await User.findOne({email: body.email})

    if(userAvailable) {
        res.status(400)
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const user = await User.create({
        username: body.username,
        email: body.email,
        password: hashedPassword
    })

    console.log(`User Created ${user}`)

    if(user) {
        res.status(201).json({_id: user.id, email: user.email})
    } else {
        res.status(400)
        throw new Error("User data is not valid")
    }

});

export const loginUser = asyncHandler(async (req: Request, res: Response, next) => {

    // const parsedData = quizSchema.safeParse(req.body);
    // if (!parsedData.success) {
    //   const errorMessages = parsedData.error.errors.map(err => {
    //     const path = err.path?.join('.');
    //     return `${path}: ${err.message}`;
    //   });
    //   next(new Error(errorMessages.join(', ')));
      
    // }
    // const quiz = new Quiz(req.body);
    // await quiz.save();
    // res.status(201).json(quiz);

    res.json({ message: "User logged in successfully" });

});

export const currentUser = asyncHandler(async (req: Request, res: Response, next) => {

    // const parsedData = quizSchema.safeParse(req.body);
    // if (!parsedData.success) {
    //   const errorMessages = parsedData.error.errors.map(err => {
    //     const path = err.path?.join('.');
    //     return `${path}: ${err.message}`;
    //   });
    //   next(new Error(errorMessages.join(', ')));
      
    // }
    // const quiz = new Quiz(req.body);
    // await quiz.save();
    // res.status(201).json(quiz);

    res.json({ message: "Current user" });

});