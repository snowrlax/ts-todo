var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// Middleware function to check if task exists
export const checkTaskExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    try {
        const task = yield prisma.task.findUnique({
            where: { id: taskId }
        });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        next(); // Move to the next middleware or route handler
    }
    catch (error) {
        console.error('Error checking task existence:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
