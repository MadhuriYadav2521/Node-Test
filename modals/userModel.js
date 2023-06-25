import mongoose from "mongoose";
 import { Schema } from "mongoose";

 const User = new Schema({
    name: String,
    email: String,
    password: String,
    pin: String,
    role: String,
    number: Number,
    accessToken : String

 });

 export default mongoose.model("Users", User);