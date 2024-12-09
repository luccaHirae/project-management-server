import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query;

    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          {
            title: {
              contains: String(query),
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: String(query),
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          {
            name: {
              contains: String(query),
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: String(query),
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: String(query),
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    res.json({ tasks, projects, users });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Error performing search: ${error.message}` });
    }

    res.status(500).json({ error: 'Error performing search' });
  }
};
