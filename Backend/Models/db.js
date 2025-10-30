import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import { mainConnection } from "../Config/db.js";
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // image URL (stored in /uploads or on Cloudinary)
    },
  },
  { timestamps: true }
);

const UserModel=mainConnection.model("User",userSchema);
const PostModel=mainConnection.model("Post",postSchema);
export default { UserModel, PostModel };