import React from 'react';
import './Rightbar.css'
import ProfileRightBar from './ProfileRightBar';
import HomeRightBar from './HomeRightBar';
const Rightbar = ({profile}) => {
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {profile?<ProfileRightBar/> :<HomeRightBar/>}
      </div>
    </div>
  )
}

export default Rightbar