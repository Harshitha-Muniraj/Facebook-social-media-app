import customResponse from '../utilities/customResponse.js';
import Posts from '../model/Post.modal.js';
import User from '../model/User.modal.js';


// createpost
export const createPost=async(req,res)=>{
   
   try {
      console.log("found user")
        let user=req.user;
        
        if(req.file.path==""){
         
         return customResponse(res,400,false,"No Link from Cloudinary",null)
        }else{
          
            let newuser=await Posts.create({
            postedby:user.id,
            caption:req.body.caption,
            img:req.file.path
            
        })
      
        
           const nUser=await newuser.save()
           return customResponse(res,200,true,"Link Add  to DB Sucessfully",nUser)
        }
}
   catch(err){
      return customResponse(res,500,false,"somethng went wrong while uploading picture",null) 
   }
}


export const myPosts=async(req,res)=>{
 
    try{
      const currentUser=await User.findById(req.params.id)
      const currentPost=await Posts.find({postedby:currentUser._id});
      
      if(currentPost){
         return customResponse(res,200,true,"got all my posts",currentPost)
         
      }
    }catch(err){
       return customResponse(res,500,false,'Somethigs went wrong',null)
    }
}


// get timeline post

export const timelinePost=async (req,res)=>{

   try{
      console.log("in time")
      const currentUser=await User.findById(req.params.id);
     
      const userPosts=await Posts.find({postedby:currentUser._id});
      
      const friendsPosts=await Promise.all(
         currentUser.following.map((friendId)=>{
            return Posts.find({postedby:friendId})
         })
      )
      
      return customResponse(res,200,true,'Fetched timeline post',userPosts.concat(...friendsPosts))
   }catch(err){
      customResponse(res,500,false,"Failed to fetch timeline posts",null)
   }
}

// like or dislike post
export const likeDislike=async(req,res)=>{
   try{
   const post= await Posts.findById(req.params.id);
   if(!post.likes.includes(req.body.userId)){
      await post.updateOne({$push:{likes:req.body.userId}});
      return customResponse(res,200,true,"Liked the picture",post)
   }else{
await post.updateOne({$pull:{likes:req.body.userId}});
return customResponse(res,200,true,"Disliked the post",post)
   }
   }catch(err){
      customResponse(res,500,false,"Didnt like or dislike the post",null)
   }
}