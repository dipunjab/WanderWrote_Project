import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import homeRouter from "./routes/home.routes.js"
import profileRouter from "./routes/profile.routes.js"
import securityRoouter from "./routes/security.routes.js"
import postRouter  from "./routes/post.routes.js"
import likeRouter from "./routes/like.routes.js"
import commentRouter from "./routes/comment.routes.js"

app.use("/wander/v1/users", userRouter)
app.use("/wander/v1/home", homeRouter)
app.use("/wander/v1/users", profileRouter)
app.use("/wander/v1/users", securityRoouter)
app.use("/wander/v1/users", postRouter)
app.use("/wander/v1/like", likeRouter)
app.use("/wander/v1/comment", commentRouter)

export { app }