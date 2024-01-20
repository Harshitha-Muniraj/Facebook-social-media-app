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



//  coverpicture

export const coverPicture=async(req,res)=>{
   
    try {
      
         let user=req.user;
        console.log(req.file.path)
         if(req.file.path==""){
          
          return customResponse(res,400,false,"No Link from Cloudinary",null)
         }else{
            user.coverPicture=req.file.path
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
    console.log('user',req.body.id)
    console.log('param',req.params.id)
    if(req.body.id!==req.params.id){
       try{
          const user=await User.findById(req.params.id);
          
          const currentUser=await User.findById(req.body.id);
          
          if(!user.followers.includes(req.body.id)){
            let nuser=await user.updateOne({$push:{followers:req.body.id}});
            // console.log("nuser",nuser)
            let cuser=await currentUser.updateOne({$push:{following:req.params.id}});

            console.log(cuser)
            return customResponse(res,200,true,"User has been followed",currentUser)
          }else{
            return customResponse(res,400,false,"You are already following this user",currentUser)
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
          const currentUser=await User.findById(req.body.id);
          console.log("user",user)
          if(user.followers.includes(req.body.id)){
            await user.updateOne({$pull:{followers:req.body.id}});
           
            console.log("uu")
           await currentUser.updateOne({$pull:{following:req.params.id}});
            return customResponse(res,200,true,"User has been unfollowed")
          }else{

            return customResponse(res,400,false,"you dont follow this user",null)
          }

       }catch(err){
        console.log("err",err)
        return customResponse(res,500,false,"Something went wrong",null)
       }
    }else{
        return customResponse(res,400,false,"You cannot unfollow yourself",null)
    }
}
export const getAllUsers=async(req,res)=>{
    let user=req.user;
    const newArr = [...req.user.following, req.user._id];
    console.log("newrr",newArr)
    try{
        const all=await User.aggregate([
            { $match: { _id: { $nin:newArr }}}])
        
        const objs=all.map((item)=>{
            return(
               {
                id:item._id,
                username:item.username,
                profilePicture:item.profilePicture
            }
            )
        })
        return customResponse(res,200,true,"all",objs)
    }catch(err){
        console.log(err)
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