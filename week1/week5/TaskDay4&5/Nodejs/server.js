import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js'; 
import personRoutes from './routes/person.route.js';
import menuRoutes from './routes/menu.route.js';
import { PORT } from './env.js'
const app = express();
app.use(bodyParser.json());
import path from 'path';
import {AuthMiddleware} from './Middlewares/jwt.Middleware.js';
import jwt from 'jsonwebtoken'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))
const logRequest= (req, res, next) => {
  console.log(`[${new Date().toLocaleString() }] request for '${req.originalUrl}'`);
  next();  //move to the next middleware or route 
}//comment after


 

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Parse incoming URL-encoded form data
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.render('home');

});

app.get('/login',function(req,res){
  res.render("login")
})
app.get('/signup',function(req,res){
res.render("signup")
})


 app.use('/person', personRoutes) 
 app.use('/menu', menuRoutes)
// app.use(logRequest); //for all functions it must run as middleware

app.listen(PORT, () => { //PORT
  console.log(`Server is running on http://localhost:${PORT}`);
 
})

