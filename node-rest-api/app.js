import express from "express";
import dotenv from "dotenv";
import './DB/db.js';
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/users.route.js";
import postsRouter from "./routes/posts.route.js";
import cors from 'cors';
dotenv.config();



const app=express();
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT||4000;

app.use("/api/auth",authRouter);

app.use("/api/users",userRouter);

app.use("/api/posts",postsRouter)



app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))