import React, { useEffect, useState } from 'react';
import './Feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import api from '../../customAxios/Axios';
import axios from 'axios';


const Feed = ({userid,token}) => {
  const id=localStorage.getItem("userid")
  const [posts,setPosts]=useState([]);
  console.log("posts",id)
  useEffect(()=>{
    
   async function fetchMyPosts(){

      const response=await api.get(`/posts/getmyposts/${userid}`);
      setPosts(await response.data.data)
      console.log("iddd",userid)
    }
    async function fetchPosts(){
      
      const response=await api.get("/posts/timeline/"+id);
      console.log("................")
      setPosts(await response.data.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt)
      }))
      
    }
    {userid ? fetchMyPosts() : fetchPosts()}
     
  },[userid,])
  return (
    <div className='feed'>
      <div className='feedWrapper'>
      <Share token={token}/>
      {
       posts.map((post)=> <Post key={post._id} post={post}/>)
      }
      </div>
      
    </div>
  )
}

export default Feed