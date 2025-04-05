import { Request, Response } from 'express';
import { createUserService, getUsersService } from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, age } = req.body;
    const newUser = await createUserService(email, firstName, lastName, age);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'User Already Exists!' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
};
