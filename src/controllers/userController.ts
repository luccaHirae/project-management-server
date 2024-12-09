import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Error retrieving users: ${error.message}` });
    }

    res.status(500).json({ error: 'Error retrieving users' });
  }
};
