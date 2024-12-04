import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.query;

    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });

    res.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Error retrieving tasks: ${error.message}` });
    }

    res.status(500).json({ error: 'Error retrieving tasks' });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId: Number(projectId),
        authorUserId: Number(authorUserId),
        assignedUserId: Number(assignedUserId),
      },
    });

    res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Error creating task: ${error.message}` });
    }

    res.status(500).json({ error: 'Error creating task' });
  }
};
