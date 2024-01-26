import express from 'express';
const authRouter=express.Router();
import {  SignUp } from '../controllers/auth.js';
import { Login } from '../controllers/auth.js';


authRouter.post("/signup",SignUp);
authRouter.post("/login",Login);



export default authRouter;