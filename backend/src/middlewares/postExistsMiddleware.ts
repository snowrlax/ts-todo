import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
const prisma = new PrismaClient();

// Middleware function to check if task exists
export const checkTaskExists = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id; 

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    next(); // Move to the next middleware or route handler

  } catch (error) {
    console.error('Error checking task existence:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}