import mongoose from "mongoose";
 import { Schema } from "mongoose";

 const Product = new Schema({
    title: String,
    price: Number,
    category: String,
    image: String

 });

 export default mongoose.model("Products", Product);