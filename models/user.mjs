import mongoose from 'mongoose'

let userSchema = mongoose.Schema({
  username : String,
  email : String,
  password : String,
},{timestamps : true})

let user = mongoose.model('user',userSchema);

export default user;