import React from 'react'

const ProfileRightBar = () => {
  return (
    <>
    <h4 className="rightbarTitle">User Information</h4>
    <div className="rightbarInfo">
        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City :</span>
            <span className="rightbarInfoValue">Mumbai</span>
        </div>
        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From : </span>
            <span className="rightbarInfoValue">India</span>
        </div>
        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship :</span>
            <span className="rightbarInfoValue">Single</span>
        </div>
    </div>
    <h4 className="rightbarTitle">User Information</h4>
    <div className="rightbarFollowings">
        <div className="rightbarFollowing">
            <img src="assets/tim.png" alt="" className='rightbarFollowingImg' />
            <span className='rightbarFollowingName'>yana</span>
        </div>
        <div className="rightbarFollowing">
            <img src="assets/tim.png" alt="" className='rightbarFollowingImg' />
            <span className='rightbarFollowingName'>yana</span>
        </div>
        <div className="rightbarFollowing">
            <img src="assets/tim.png" alt="" className='rightbarFollowingImg' />
            <span className='rightbarFollowingName'>yana</span>
        </div>
        <div className="rightbarFollowing">
            <img src="assets/tim.png" alt="" className='rightbarFollowingImg' />
            <span className='rightbarFollowingName'>yana</span>
        </div>
        <div className="rightbarFollowing">
            <img src="assets/tim.png" alt="" className='rightbarFollowingImg' />
            <span className='rightbarFollowingName'>yana</span>
        </div>
    </div>
    </>
  )
}

export default ProfileRightBar