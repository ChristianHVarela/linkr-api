import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { postRouter } from './routes/post.route.js'

dotenv.config()
const server = express()
server.use(cors())
server.use(express.json())

server.use([postRouter])

server.listen(process.env.PORT || 5000, () => {
    console.log("server is fun");
})