import React from 'react';
import './followList.css'

const FollowList = ({user}) => {
  
  return (
    <li className='sidebarFriend'>
            <img src={user.profilePicture} alt="friend-pic" className='sidebarFriendImg'/>
            <span className='sidebarFriendName'>{user.username}</span>
          </li>
  )
}

export default FollowList