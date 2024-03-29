import express, { Request, Response } from 'express'
import {router as todoRouter} from "./todo.js"

export const router = express.Router()

router.use('/todo', todoRouter)

router.get('/', (req: Request, res: Response) => {
    res.json({
        msg: "server is healthy"
    })
})