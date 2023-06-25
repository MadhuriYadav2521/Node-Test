console.log("working");
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./routes/UserRoutes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1',router);

mongoose.connect('mongodb+srv://madhuri13:diebold123@cluster0.ay3ihrp.mongodb.net/nodeTestDB')
.then( () => console.log("db connected"))
.catch( (error) => console.log(error));




app.listen(8000, () => console.log("working on port 8000"));