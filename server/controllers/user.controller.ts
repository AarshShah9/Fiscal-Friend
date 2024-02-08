import User from '../models/User';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log('Request Body:', req.body);
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(400).json({ error: 'Failed to create user' });
  }
};
