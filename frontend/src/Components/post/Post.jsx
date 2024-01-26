import React, { useContext, useEffect, useState } from 'react';
import './Post.css';
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom'
import { UserContext } from '../../context/UserContext';


const Post = ({post}) => {
 const {pic}=useContext(UserContext)
    const [like,setLike]=useState(post.likes.length);
    const [isLiked,setIsLiked]=useState(false);
    const [user,setUser]=useState({});
   const id=localStorage.getItem("userid")
    useEffect(()=>{
      const fetchUser=async()=>{
        const response=await axios.get(`http://localhost:5000/api/users/${post.postedby}`);
        setUser(await response.data.data)
        
      }
      fetchUser() 
    },[post.postedby,pic])
useEffect(()=>{
  setIsLiked(post.likes.includes(id))
},[id,post.likes])
    async function likeHandler(){
      try{
        await axios.put("http://localhost:5000/api/posts/"+post._id+"/like",{userId:id})
      }catch(err){
       
      }
       setLike(isLiked?like-1:like+1);
       setIsLiked(!isLiked)
    }
  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to= {`profile/${user._id}`}>
                    <img src={user.profilePicture||"https://lastinch.in/wp-content/uploads/2020/09/blank-user.gif" } alt="user-pic" className='postProfileImg'/>
                    </Link>
                    <span className='postUserName'>{user.username}</span>
                    <span className='postDate'>{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                <ion-icon name="ellipsis-vertical" ></ion-icon>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.caption}</span>
                <img src={post.img} alt="" className='postImg' />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                 <img src='https://e7.pngegg.com/pngimages/140/830/png-clipart-like-logo-facebook-like-button-facebook-like-button-computer-icons-like-miscellaneous-blue-thumbnail.png'onClick={likeHandler} className="likeIcon" alt="thumbsup" />
                 <img src='https://www.pngfind.com/pngs/m/6-62693_facebook-heart-transparent-facebook-heart-icon-hd-png.png' className="likeIcon" onClick={likeHandler} alt="heartpic" />
                 <span className='postLikeCounter' onClick={()=>likeHandler}>{like} ppl liked it</span>
                </div>
                <div className="postBottomRight">
                   <span className="postCommentText">{post.comment} comments</span> 
                </div>
            </div>
        </div>

    </div>
  )
}

export default Post