import './Profile.css';
import React, { useContext, useEffect, useState } from 'react'
import TopBar from '../../Components/topBar/TopBar'
import Sidebar from '../../Components/sidebar/Sidebar'
import Feed from '../../Components/feed/Feed';
import Rightbar from '../../Components/rightbar/Rightbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import api from '../../customAxios/Axios';

const Profile = () => {

  const [user,setUser]=useState([]);
  const {id}=useParams();
  
 
  useEffect(()=>{
    const fetchUser=async()=>{
      const response= await api.get(`/users/${id}`);
      setUser(await response.data.data);
     
    }
    fetchUser()
  },[])
  
  

  return (
    <div >
    <TopBar userpic={user.profilePicture}/>
    <div className="profile">
      <Sidebar/>
      <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
              
                <img src={user.coverPicture || 'https://addons-media.operacdn.com/media/CACHE/images/themes/75/230075/1.0-rev1/images/cd48e4fdc5f3290c815d4a5e4635b034/5b3c5e0530e5fbe3abeacb91f7d828bb.jpg'} className='profileCoverImg' alt="" />
                <img src={user.profilePicture ||' https://lastinch.in/wp-content/uploads/2020/09/blank-user.gif'} className='profileUserImg' alt="profile pic" />
            </div>
            <div className="profileInfo">
                <h4 className='profileInfoName'>{user.username}</h4>
                <span className='profileInfoDesc'>{user.desc}</span>
            </div>
         
        </div>
        <div className="profileRightBottom">
        <Feed userid={id} />
        <Rightbar profile />
        </div>
      </div>
      
    </div>
    
    </div>
  )
}

export default Profile