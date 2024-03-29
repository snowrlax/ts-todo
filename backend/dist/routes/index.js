import express from 'express';
import { router as todoRouter } from "./todo.js";
export const router = express.Router();
router.use('/todo', todoRouter);
router.get('/', (req, res) => {
    res.json({
        msg: "server is healthy asf"
    });
});
