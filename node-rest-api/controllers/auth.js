import express from 'express';
import customResponse from '../utilities/customResponse.js';
import User from "../model/User.modal.js";
import bcrypt from "bcryptjs";
import {v4 as uuidv4} from 'uuid';



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
