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
  const [loading,setLoading]=useState(false)
  const {id}=useParams();
 
  const {user:currentuser,setPic}=useContext(UserContext)
  const [user,setUser]=useState([]);
  const [pp,setpp]=useState(user.profilePicture);
  const [cover,setCover]=useState(user.coverPicture)
  
  useEffect(()=>{
    const fetchUser=async()=>{
      const response= await api.get(`/users/${id}`);
      setUser(await response.data.data);
     setpp(await response.data.data.profilePicture);
     setCover(await response.data.data.coverPicture);
     
    }
    fetchUser()
  },[id,file1,file2,pp,cover,])

  const addPic1=async(e)=>{
    e.preventDefault();
    setLoading(true)
    const newPost=new FormData()
    newPost.append("img",file1)
    
    if(file1){
     const headers={
         "token":currentuser.token
     }
     try{
         const response=await api.post(`/users/coverpicture`,newPost,{headers})
         setCover(await response.data.data.coverPicture);
         setPic(await response.data.data.profilePicture)
         setLoading(false)
        //  window.location.reload()
        //  console.log('resp',response)
        }catch(err){
         console.log(err)
        }
     }
    }
    const addPic2=async(e)=>{
    e.preventDefault()
    setLoading(true)
      const newPost=new FormData()
      newPost.append("img",file2)
      
      if(file2){
       const headers={
           "token":currentuser.token
       }
       try{
           const response=await api.post(`/users/profilepicture`,newPost,{headers})
          
           localStorage.setItem("userpic",response.data.data.profilePicture)
           setPic(await response.data.data.profilePicture)
          //  window.location.reload()

          setpp(await response.data.data.profilePicture)
           setLoading(false)
          }catch(err){
           console.log(err)
          }
       }
      }
      
  
  
  


  return (
    <div >
    <TopBar />
    <div className="profile">
      <Sidebar/>
     
      <div className="profileRight">
      {loading?<div style={{width:"100%",height:"400px",display:"flex",alignItems:"center",justifyContent:"center"}}>Loading....</div>:
        <div className="profileRightTop">
            <div className="profileCover">
            {user._id==currentuser._id?
            <img src={cover ||'https://addons-media.operacdn.com/media/CACHE/images/themes/75/230075/1.0-rev1/images/cd48e4fdc5f3290c815d4a5e4635b034/5b3c5e0530e5fbe3abeacb91f7d828bb.jpg '} className='profileCoverImg' alt="profile pic" /> :
                <img src={user.coverPicture || 'https://addons-media.operacdn.com/media/CACHE/images/themes/75/230075/1.0-rev1/images/cd48e4fdc5f3290c815d4a5e4635b034/5b3c5e0530e5fbe3abeacb91f7d828bb.jpg'} className='profileCoverImg' alt="" />}
                {user._id==currentuser._id &&
                <form onSubmit={addPic1}>
                <label htmlFor='file1' className="shareOption">
                  {file1?null: <ion-icon name="pencil"  id='cp'></ion-icon>}
                  <input  type="file" id='file1' accept='.png,.jpeg,.jpg' onChange={(e)=>{setFile1(e.target.files[0])}} />
                  {file1&&<button type='submit'><ion-icon name="add" id ='cp' ></ion-icon></button>}
                </label>
                </form>}
                {user._id==currentuser._id?
                <img src={pp ||' https://lastinch.in/wp-content/uploads/2020/09/blank-user.gif'} className='profileUserImg' alt="profile pic" /> :
                <img src={user.profilePicture ||' https://lastinch.in/wp-content/uploads/2020/09/blank-user.gif'} className='profileUserImg' alt="profile pic" />}
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
}
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