import express from 'express';
import customResponse from '../utilities/customResponse.js';
import User from "../model/User.modal.js";
import bcrypt from "bcryptjs";
import {v4 as uuidv4} from 'uuid';
import checkLogin from '../middleware/checkLogin.js';
import sendEmail from '../utilities/sendMail.js';

export const SignUp=async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
      customResponse(res,400,false,"Fill all the fields",null)
    }
    
    try{
        
        const foundUser= await User.findOne({email:email});
       
        if(foundUser==null){
            
            const hashedPassword= await bcrypt.hash(password,10)
            const newUser= await User.create({
                username,email,password:hashedPassword
            })
            
            const nUser=await newUser.save();
            if(nUser){
                let token =uuidv4();
                nUser.token=token;
                let updatedUser=await nUser.save();
                return customResponse(res,200,true,"user registered successfully",updatedUser)
            }
               
            }else{
                return customResponse(res,400,"User Already Exists",null)
            } 
             
        }
    catch(error){
        customResponse(res,500,false,"Something went wrong",null)
    }
}

export const Login=async(req,res)=>{
    const {email,password}=req.body;

    if(!email ||!password){
        return customResponse(res,400,false,"please fill all the fields",null)
    }
    try{
       const foundUser=await User.findOne({email:email});
       if(foundUser==null){
        return customResponse(res,400,false,"user doesnot exists",null)
       }

       const isMatch=bcrypt.compareSync(password,foundUser.password);
       if(isMatch){
        let token=uuidv4();
        foundUser.token=token;
        let updatedUser=await foundUser.save();
        return customResponse(res,200,true,"login successful",updatedUser)
       }else{
        return customResponse(res,400,false,"invalid credentials",null)
       }
    }
    catch(err){
        customResponse(res,500,false,"Something went wrong",null)
    }
    
}
// .....sendMail..


// ...................otp generator.....
const generateOtp = () => {
    let otp = "";
    // let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for(let i=0;i<6;i++){
        otp += Math.floor(Math.random()*10);
    }
    return otp;

}

// ............forgott password.............if the user forgot  his password we will send otp to user email
export const SendOtp=async(req,res)=>{
    try {
     let {email}=req.body
     if(!email){
       return customResponse(res,400,false,"Enter your Email",null)
     }
     let exist=await User.findOne({email})
     if(exist ==null){
       return customResponse(res,400,false,"User is Not Registered",null)
     }
      // ..adding otp to db..
   
     let otp=generateOtp()
     exist.verificationCode=otp
     await exist.save()
     
     sendEmail({
       to:email,
       subject:"OTP for forgot password!",
       text:otp
     })
     return customResponse(res,200,true,"OTP sent sucessfully",exist)  
     
    } catch (error) {
     return customResponse(res,500,false,"something went wrong",null)
    }
   
   }



export  const ForgotPassword=async(req,res)=>{
    let {email,otp,password,confirmPassword}=req.body
    console.log(req.body)
    if(!email || !otp || !password || !confirmPassword){
      return customResponse(res,200,false,"Required all fields",null)
    }
    try {
      let exist = await User.findOne({ email });
      console.log(exist);
      if (exist == null) {
          return customResponse(res,200,false,"Enter Valid Email",null)
      }
      if(password!==confirmPassword){
        return customResponse(res,400,false,"Password and Confirm-Password Must be same",null)
      }
      if(otp!=exist.verificationCode){
        return customResponse(res,400,false,"Invalid OTP",null)
      }
      let hashPassword = await bcrypt.hash(password, 10);
      exist.password=hashPassword
      await exist.save()
      return customResponse(res,200,true,"Password changed Successfully",exist)
  
    } catch (error) {
      customResponse(res,500,false,"something went wrong",null)
    }
   
  
  
  }