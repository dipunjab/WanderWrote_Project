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

app.use("/wander/v1/users", userRouter)

export { app }