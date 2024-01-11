import React, { useEffect, useState } from 'react';
import './Feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
// import { Posts } from '../../PostData';
import axios from 'axios'

const Feed = ({userid}) => {
  const [posts,setPosts]=useState([]);
  console.log("posts",posts)
  useEffect(()=>{
    {userid ? fetchMyPosts() : fetchPosts()}
   async function fetchMyPosts(){

      const response=await axios.get(`/posts/getmyposts/${userid}`);
      setPosts(await response.data.data)
     
    }
    async function fetchPosts(){

      const response=await axios.get('/posts/timeline/659d4af210ca1288aca7f620');
      setPosts(await response.data.data)
      
    }
     
  },[])
  return (
    <div className='feed'>
      <div className='feedWrapper'>
      <Share/>
      {
       posts.map((post)=> <Post key={post._id} post={post}/>)
      }
      </div>
      
    </div>
  )
}

export default Feed