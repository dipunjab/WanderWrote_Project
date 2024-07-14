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

app.get('/', (req, res) => {
    res.render('layout', { title: 'Home' }); // Render index.pug with data
});
app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' }); // Render index.pug with data
});
app.get('/createpost', (req, res) => {
    res.render('createpost', { title: 'Home' }); // Render index.pug with data
});
app.get('/userposts', (req, res) => {
    res.render('userposts', { title: 'Home' }); // Render index.pug with data
});
app.get('/profile', (req, res) => {
    res.render('profile', { title: 'Home' }); // Render index.pug with data
});
app.post('/profile', (req, res) => {
    res.render('profile', { title: 'Home' }); // Render index.pug with data
});

app.get('/security', (req, res) => {
    res.render('security', { title: 'Home' }); // Render index.pug with data
});
app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Home' }); // Render index.pug with data
});
app.get('/login', (req, res) => {
    res.render('login', { title: 'Home' }); // Render index.pug with data
});
export { app }