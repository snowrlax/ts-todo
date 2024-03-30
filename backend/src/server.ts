import express from 'express'
import cors from 'cors'
import { router as rootRouter } from './routes/index.js'


const app = express()

app.use(cors())
app.use(express.json())


app.use('/app/', rootRouter)

app.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})