import React, { useContext, useRef, useState } from 'react'
import './Share.css';
import api from '../../customAxios/Axios';

import { UserContext } from '../../context/UserContext';

const Share = () => {
    const {user,pic}=useContext(UserContext)
    const caption=useRef()
    const [file,setFile]=useState(null);
   

    const submitHandler=async(e)=>{
       e.preventDefault()
       const newPost=new FormData()
       newPost.append("img",file)
       newPost.append("caption",caption.current.value)
       
       if(file){
        const headers={
            "token":user.token
        }
        try{
            const response=await api.post(`/posts/uploadpost`,newPost,{headers})
           
            window.location.reload()
           }catch(err){
            console.log(err)
           }
        }
       }
       
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={pic||'https://lastinch.in/wp-content/uploads/2020/09/blank-user.gif'} alt="userpic" className='shareProfileImg' />
                <input placeholder={"Whats's in your mind" +` ${user.username}`} className='shareInput' ref={caption} />
            </div>
            <hr className='shareHr' />
            <form className="shareButtom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                    <ion-icon name="images" id='shareIcon1'></ion-icon>
                        <span className='shareOptionText'>Photo or Video</span>
                        <input  type="file" id='file' accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])} />
                    </label>
                    <label className="shareOption">
                    <ion-icon name="pricetag" id='shareIcon2'></ion-icon>
                        <span className='shareOptionText'>Tag</span>
                    </label>
                    <label className="shareOption">
                    <ion-icon name="location" id='shareIcon3'></ion-icon>
                        <span className='shareOptionText'>Location</span>
                    </label>
                    <div className="shareOption">
                    <ion-icon name="happy" id='shareIcon4'></ion-icon>
                        <span className='shareOptionText'>Feelings</span>
                    </div>
                </div>
                <button className='shareButton' type='submit'>Share</button>
            </form>
        </div>
    </div>
  )
}


export default Share