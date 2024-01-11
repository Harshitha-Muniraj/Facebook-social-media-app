import express from 'express';
const authRouter=express.Router();
import { ForgotPassword, SendOtp, SignUp } from '../controllers/auth.js';
import { Login } from '../controllers/auth.js';


authRouter.post("/signup",SignUp);
authRouter.post("/login",Login);
authRouter.post("/sendotp",SendOtp)
authRouter.post("/forgotpassword",ForgotPassword)


export default authRouter;