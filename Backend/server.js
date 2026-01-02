import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
<<<<<<< HEAD
import { Register } from './src/Controllers/AuthController';
=======
import { Register, Login } from './src/Controllers/AuthController.js';

>>>>>>> 56a44042e58600281201a99333a5c51c30553286
dotenv.config();
const app =express();

app.use(express.json())

// require('dotenv').config();
// const PORT=5050;

const PORT=process.env.PORT||5050;
const MONGO_URL=process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));



app.get('/',(req,res)=>{
    res.send('Hello')
})

app.post("/user", Register);

app.post("/login", Login);

app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}`)
});



