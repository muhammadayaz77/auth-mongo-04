import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database.mjs';
dotenv.config();
let app = express();

// database connection
connectDB();

// middleware
app.use(express.json()); 
app.use(cors()); 

const port = process.env.PORT || 8080;

app.listen(port,() => {
  console.log(`http://localhost:${port}`);
})