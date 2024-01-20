import './Profile.css';
import React, { useContext, useEffect, useState } from 'react'
import TopBar from '../../Components/topBar/TopBar'
import Sidebar from '../../Components/sidebar/Sidebar'
import Feed from '../../Components/feed/Feed';
import Rightbar from '../../Components/rightbar/Rightbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import api from '../../customAxios/Axios';
import { UserContext } from '../../context/UserContext';

const Profile = () => {
  const [file1,setFile1]=useState(null);
  const [file2,setFile2]=useState(null)
 
  const {id}=useParams();
 
  const {user:currentuser}=useContext(UserContext)
  const [user,setUser]=useState([]);
  useEffect(()=>{
    const fetchUser=async()=>{
      const response= await api.get(`/users/${id}`);
      setUser(await response.data.data);
     
    }
    fetchUser()


  
  },[id,file1,file2])

  const addPic1=async(e)=>{
    e.preventDefault()
    const newPost=new FormData()
    newPost.append("img",file1)
    
    console.log(newPost,file1)
    if(file1){
     const headers={
         "token":currentuser.token
     }
     try{
         const response=await api.post(`/users/coverpicture`,newPost,{headers})
         window.location.reload()
         console.log('resp',response)
        }catch(err){
         console.log(err)
        }
     }
    }
    const addPic2=async(e)=>{
    e.preventDefault()
      const newPost=new FormData()
      newPost.append("img",file2)
      
      console.log(newPost,file2)
      if(file2){
       const headers={
           "token":currentuser.token
       }
       try{
           const response=await api.post(`/users/profilepicture`,newPost,{headers})
           window.location.reload()
           console.log('resp',response)
          }catch(err){
           console.log(err)
          }
       }
      }
      
  
  
  


  return (
    <div >
    <TopBar userpic={user.profilePicture}/>
    <div className="profile">
      <Sidebar/>
      <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
              
                <img src={user.coverPicture || 'https://addons-media.operacdn.com/media/CACHE/images/themes/75/230075/1.0-rev1/images/cd48e4fdc5f3290c815d4a5e4635b034/5b3c5e0530e5fbe3abeacb91f7d828bb.jpg'} className='profileCoverImg' alt="" />
                {user._id==currentuser._id &&
                <form onSubmit={addPic1}>
                <label htmlFor='file1' className="shareOption">
                  {file1?null:<ion-icon name="pencil"  id='cp'></ion-icon>}
                  <input  type="file" id='file1' accept='.png,.jpeg,.jpg' onChange={(e)=>{setFile1(e.target.files[0])}} />
                  {file1&&<button type='submit'><ion-icon name="add" id ='cp' ></ion-icon></button>}
                </label>
                </form>}
                <img src={user.profilePicture ||' https://lastinch.in/wp-content/uploads/2020/09/blank-user.gif'} className='profileUserImg' alt="profile pic" />
                {user._id==currentuser._id && 
                <form onSubmit={addPic2}>
                <label htmlFor='file2' className="shareOption">
                    {file2? null :<ion-icon name="pencil" id='pp'></ion-icon>}
                        
                        <input  type="file" id='file2' accept='.png,.jpeg,.jpg' onChange={(e)=>setFile2(e.target.files[0])} />
                        {file2 && <button type='submit'><ion-icon name="add" id='pp' ></ion-icon></button>}
                    </label>
                    </form>}
                    </div>
            <div className="profileInfo">
                <h4 className='profileInfoName'>{user.username}</h4>
                <span className='profileInfoDesc'>{user.desc}</span>
            </div>
         
        </div>
        <div className="profileRightBottom">
        <Feed userid={id} userpic={user.profilePicture} />
        <Rightbar profile />
        </div>
      </div>
      
    </div>
    
    </div>
  )
}

export default Profile