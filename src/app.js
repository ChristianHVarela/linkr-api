import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import signupRouter from "./routes/signup.routes.js"
import { postRouter } from './routers/post.route.js'
import hashtagsRouter from "./routers/hashtags.js"

dotenv.config()
const server = express()
server.use(cors())
server.use(express.json())

server.use([postRouter, hashtagsRouter, signupRouter])

server.listen(process.env.PORT || 5000, () => {
    console.log("server is fun");
})