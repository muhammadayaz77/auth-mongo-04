import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database.mjs';
import User from './models/user.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
dotenv.config();
let app = express();

// database connection
connectDB();

// middleware
app.use(express.json()); 
app.use(cors()); 

app.post("/create", (req,res) => {
  let {username,email,password} = req.body;
 
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt,async function(err, hash) {
        // Store hash in your password DB.
        let createdUser = new User({
          username,
          email,
          password : hash,
        });
        await createdUser.save();
        let token = jwt.sign({email},'secret');
        res.cookie("token",token);
        res.send(createdUser);
      });
});
})
app.post('/login',async (req,res) => {
  let user = await User.findOne({email:req.body.email});
  if(!user) return res.send("User not found");
  bcrypt.compare(req.body.password,user.password,(err,result) => {
    console.log(result)
    if(result) return res.send("You are login");
    else
    res.send('Something went wrong');
  })
})
app.get("/logout",(req,res) => {
  res.cookie("tokent","");
  res.send("Logout");
})
const port = process.env.PORT || 8080;

app.listen(port,() => {
  console.log(`http://localhost:${port}`);
})