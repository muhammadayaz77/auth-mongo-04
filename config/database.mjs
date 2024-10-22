import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB)
  console.log("Connected to Mongo");
  } catch (error) {
  console.log(error.message);
  }

}
export default connectDB; 