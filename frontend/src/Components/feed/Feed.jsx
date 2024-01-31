import React, { useContext, useEffect, useState } from 'react';
import './Feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import api from '../../customAxios/Axios';
import { UserContext } from '../../context/UserContext';



const Feed = ({userid}) => {
  const id=localStorage.getItem("userid");
  const {user,pic}=useContext(UserContext)
  const [posts,setPosts]=useState([]);

  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    
   async function fetchMyPosts(){
     
      const response=await api.get(`/posts/getmyposts/${userid}`);
    
      setPosts(await response.data.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt)
      }))
    }
    async function fetchPosts(){
      setLoading(true)
      const response=await api.get("/posts/timeline/"+id);
      
      setPosts(await response.data.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt)
      }))
      setLoading(false)
    }
    {userid ? fetchMyPosts() : fetchPosts()}
     
  },[userid,user])
  return (
 
    <div className='feed'>
      
      {loading? <div>Loading....</div>:
      <div className='feedWrapper'>
      {((!userid || (userid==id )))&& <Share  />}
      {
       posts.map((post)=> <Post key={post._id} post={post}/>)
      }
      </div>}
      
      
    </div>
    
  )
}

export default Feed