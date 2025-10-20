const express =require ("express");
const dotenv = require('dotenv').config();
const colors = require("colors");
const port =process.env.PORT || 5000;;
const {errorHandler}=require('./Middleware/errorMiddleware')
const connectdb = require("./db"); 
const app =express();

console.log('Loaded JWT_SECRET:', process.env.JWT_SECRET)

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./Routes/goalRoutes'))
app.use('/api/users',require('./Routes/UserRoutes'))

app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`) 
})