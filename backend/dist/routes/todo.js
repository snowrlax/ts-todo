var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { PrismaClient } from '@prisma/client';
import z from 'zod';
import { checkTaskExists } from '../middlewares/postExistsMiddleware.js';
const prisma = new PrismaClient();
export const router = express.Router();
// get all tasks
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.task.findMany({});
        res.json({
            msg: "get all todos",
            response
        });
    }
    catch (e) {
        res.status(500).json({
            error: "error fetching todo with id"
        });
    }
}));
// get one task 
// add a middleware here if the todo is gated
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    try {
        const response = yield prisma.task.findUnique({
            where: {
                id: todoId
            }
        });
        res.json({
            msg: "todo fetched",
            response
        });
    }
    catch (e) {
        res.status(500).json({
            error: "error fetching todo with id"
        });
    }
}));
// zod schema
const newTaskSchema = z.object({
    title: z.string().max(60),
    description: z.string().max(150).optional()
});
// use Middleware here
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // zod input validation
    const { success } = newTaskSchema.safeParse(body);
    if (!success) {
        return res.json({
            message: "Invalid inputs"
        });
    }
    try {
        const response = yield prisma.task.create({
            data: {
                title: body.title,
                description: body.description
            }
        });
        res.json({
            msg: "todo created",
            response
        });
    }
    catch (e) {
        res.status(500).json({
            error: "error fetching todo with id"
        });
    }
}));
const udpateTaskSchema = z.object({
    title: z.string().max(60).optional(),
    description: z.string().max(150).optional()
});
// use middleware that checks if the task with id exists or not
router.put('/:id', checkTaskExists, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    const body = req.body;
    // zod input validation
    const { success } = udpateTaskSchema.safeParse(body);
    if (!success) {
        return res.json({
            message: "Invalid inputs"
        });
    }
    try {
        const response = yield prisma.task.update({
            where: {
                id: todoId
            }, data: {
                title: body.title,
                description: body.description
            }
        });
        res.json({
            msg: "updated todo",
            response
        });
    }
    catch (e) {
        res.status(500).json({
            error: "error fetching todo with id"
        });
    }
}));
router.delete('/:id', checkTaskExists, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.id;
    try {
        // find the task with id
        const exists = yield prisma.task.findFirst({
            where: {
                id: todoId
            }
        });
        if (!exists) {
            return res.status(404).json({
                message: `todo with id: ${todoId} not found`
            });
        }
        const response = yield prisma.task.delete({
            where: {
                id: todoId
            }
        });
        res.json({
            msg: " get all the todos"
        });
    }
    catch (e) {
        res.status(500).json({
            error: "error fetching todo with id"
        });
    }
}));
