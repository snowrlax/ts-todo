import express from 'express'
import { PrismaClient } from '@prisma/client'
import z from 'zod'
import { checkTaskExists } from '../middlewares/postExistsMiddleware.js'

const prisma = new PrismaClient()

export const router = express.Router()

// get all tasks
router.get('/', async (req, res) => {
    try {
        const response = await prisma.task.findMany({})

        res.json({
            msg: "get all todos",
            response
        })
    } catch (e) {
        res.status(500).json({
            error: "error fetching todo with id"
        })
    }
})

// get one task 
// add a middleware here if the todo is gated
router.get('/:id', async (req, res) => {
    const todoId = req.params.id
    try {
        const response = await prisma.task.findUnique({
            where: {
                id: todoId
            }
        })

        res.json({
            msg: "todo fetched",
            response
        })
    } catch (e) {
        res.status(500).json({
            error: "error fetching todo with id"
        })
    }
})

// zod schema
const newTaskSchema = z.object({
    title: z.string().max(60),
    description: z.string().max(150).optional()
})

// use Middleware here
router.post('/', async (req, res) => {
    const body = req.body
    console.log(req.body)
    // zod input validation
    const { success } = newTaskSchema.safeParse(body.data)

    if (!success) {
        return res.json({
            message: "Invalid inputs while creating todo"
        })
    }

    try {
        const response = await prisma.task.create({
            data: {
                title: body.data.title,
                description: body.data.description
            }
        })
        res.json({
            msg: "todo created",
            response
        })
    } catch (e) {
        res.status(500).json({
            error: "error fetching todo with id"
        })
    }
})

const udpateTaskSchema = z.object({
    title: z.string().max(60).optional(),
    description: z.string().max(150).optional(), 
    done: z.boolean().optional()
})
    
// use middleware that checks if the task with id exists or not
router.put('/:id', checkTaskExists, async (req, res) => {
    const todoId = req.params.id
    const body = req.body

    // zod input validation
    const { success } = udpateTaskSchema.safeParse(body.data)

    if (!success) {
        return res.json({
            message: "Invalid inputs"
        })
    }

    try {

        const response = await prisma.task.update({
            where: {
                id: todoId
            }, data: {
                title: body.data.title,
                description: body.data.description,
                done: body.data.done
            }
        })
        res.json({
            msg: "updated todo",
            response
        })
    } catch (e) {
        res.status(500).json({
            error: "error fetching todo with id"
        })
    }

})

router.delete('/:id', checkTaskExists, async (req, res) => {
    const todoId = req.params.id
    
    try {
        // find the task with id
        const exists = await prisma.task.findFirst({
            where: {
                id: todoId
            }
        })
        if(!exists) {
            return res.status(404).json({
                message: `todo with id: ${todoId} not found`
            })
        }
        const response = await prisma.task.delete({
            where: {
                id: todoId
            }
        })
        res.json({
            msg: " get all the todos"
        })
    } catch (e) {
        res.status(500).json({
            error: "error fetching todo with id"
        })
    }
})