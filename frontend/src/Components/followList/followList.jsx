import React, { useContext, useState } from 'react';
import './followList.css';
import api from '../../customAxios/Axios';
import { UserContext } from '../../context/UserContext';

const FollowList = ({sug}) => {
  const [followed, setFollowed] = useState(false)

  const {user,dispatch}=useContext(UserContext)
  const handleClick = async (id) => {
    
    try {
        if(followed){
            const responsone=await api.put("/users/"+id+"/unfollow",{"id":user._id});
            
            dispatch({ type: "UNFOLLOW", payload:id });
        }
        else {
            
            const response=await api.put("users/"+id+"/follow",{
                "id":user._id
            })
           
            dispatch({ type: "FOLLOW", payload:id });
        }
       setFollowed(!followed)
        
  } catch (err) {
    console.log(err)
}

}
  return (
    <li className='sidebarFriend'>
          
            <img src={sug.profilePicture||'https://lastinch.in/wp-content/uploads/2020/09/blank-user.gif'} alt="friend-pic" className='sidebarFriendImg'/>
            <span className='sidebarFriendName'>{sug.username}</span>
    
            <button className='suggesionFollowBtn' onClick={()=>handleClick(sug.id)}>{followed? 'unfollow':'Follow'}</button>
          </li>
  )
}

export default FollowList