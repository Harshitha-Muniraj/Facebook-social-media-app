import express from 'express';
import customResponse from '../utilities/customResponse.js';
import User from "../model/User.modal.js";
import bcrypt from "bcryptjs";

// update user it can be password or anything

export const updateUser=async(req,res)=>{
    if(req.body.userId===req.params.id){
       if(req.body.from){
        try{
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt)
        }catch(err){
            return customResponse(res,500,false,err,null)
        }
       }
       try{
        const user= await User.findByIdAndUpdate(req.params.id,{$set:req.body});
        customResponse(res,200,true,"Account has been updated",user)
       }catch(err){
        return customResponse(res,500,false,err,null)
       }
    }else {
        return customResponse(res,400,false,"You can update only your account",null)
    }
}
// deleteUser
export const deleteUser=async(req,res)=>{
    if(req.body.userId===req.params.id){
       
       try{
        const user= await User.findByIdAndDelete(req.params.id);
        customResponse(res,200,true,"Account has been deleted",null)
       }catch(err){
        return customResponse(res,500,false,err,null)
       }
    }else {
        return customResponse(res,200,true,"You can delete only your account",null)
    }
}
// getUser

export const instaUser=async(req,res)=>{
    try {
        const user= await User.findById(req.params.id);
        
        const{password,updatedAt,...otherDetails}=user._doc
        return customResponse(res,200,true,"user found",otherDetails)
    } catch (error) {
        customResponse(res,400,false,"You can only get user details",null)
    }
}


// upload profile picture

export const profilePicture=async(req,res)=>{
   
    try {
      
         let user=req.user;
        console.log(req.file.path)
         if(req.file.path==""){
          
          return customResponse(res,400,false,"No Link from Cloudinary",null)
         }else{
            user.profilePicture=req.file.path
            const nUser=await user.save()
         console.log('newuser',user)
         
            
            return customResponse(res,200,true,"Link Add  to DB Sucessfully",nUser)
         }
 }
    catch(err){
       return customResponse(res,500,false,"somethng went wrong while uploading picture",null) 
    }
 }

// follow user
export const followUser=async(req,res)=>{
    console.log('user',req.user.id)
    console.log('param',req.params.id)
    if(req.user.id!==req.params.id){
       try{
          const user=await User.findById(req.params.id);
          
          const currentUser=await User.findById(req.user.id);
          
          if(!user.followers.includes(req.user.id)){
            await user.updateOne({$push:{followers:req.user.id}});
            await currentUser.updateOne({$push:{following:req.params.id}});
            return currentUser(res,200,true,"User has been followed",currentUser)
          }else{
            return customResponse(res,400,false,"You are already following this user")
          }

       }catch(err){
        return customResponse(res,500,false,"Something went wrong",null)
       }
    }else{
        customResponse(res,400,false,"You cannot follow yourself",null)
    }
}

// unfollow user

export const unfollowUser=async(req,res)=>{
    
    if(req.body.id!==req.params.id){
    
       try{
          const user=await User.findById(req.params.id);
          const currentUser=await User.findById(req.user.id);
          console.log("user",user)
          if(user.followers.includes(req.user.id)){
            
            const updateduser=await user.updateOne({$pull:{followers:req.user.id}});
            let update=await updateduser.save();
            console.log("uu",update)
            await currentUser.updateOne({$pull:{following:req.params.id}});
            return currentUser(res,200,true,"User has been unfollowed",currentUser)
          }else{
            return customResponse(res,400,false,"you dont follow this user")
          }

       }catch(err){
        return customResponse(res,500,false,"Something went wrong",null)
       }
    }else{
        return customResponse(res,400,false,"You cannot unfollow yourself",null)
    }
}


// get friends
export const getFriends=async(req,res)=>{
    // let user=req.user;
    // console.log("in token",user)
    try{
        const currentUser=await User.findById(req.params.id);
        const friends=await Promise.all(
            currentUser.following.map(friendId=>{
                return User.findById(friendId)
            })
        )
        let friendslist=[]
        friends.map(friend=>{
            const {_id,username,profilePicture}=friend;
            friendslist.push({_id,username,profilePicture})
        })
        return customResponse(res,200,true,"Fetched all friendslist",friendslist)
    }catch(err){
        return customResponse(res,500,false,"Something went wrong while fetching friendlist ",null)
    }
}


// .................Reset. Password...............................
export const ResetPassword=async(req,res)=>{
    let user=req.user
    let {oldPassword,newPassword,confirmPassword}=req.body
    if(!oldPassword || !newPassword || !confirmPassword){
        return customResponse(res,400,false,"Required All fields",null)
    }
    if(newPassword!==confirmPassword){
      return customResponse(res,400,false,"New Password And confirmPassword must be same",null)
    }
    // console.log("userrrrrrrrrrrrrrrrrrr",)
    if(!await bcrypt.compare(oldPassword, user.password)){
        return customResponse(res,400,false,"Incorrect Old Password ",null)
    }
    try {
      let hashPassword = await bcrypt.hash(newPassword, 10);
    let exist=await User.findOne({email:user.email})
    exist.password=hashPassword
    let updated_User=await exist.save()
    return customResponse(res,200,true,"Successfully Reset The Password",updated_User)
    } catch (error) {
      customResponse(res,500,false,"something went wrong",null)
    }
}