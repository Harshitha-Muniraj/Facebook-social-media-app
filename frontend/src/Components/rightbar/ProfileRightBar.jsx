import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../customAxios/Axios';
import userContext from '../../context/StyleContext';

const ProfileRightBar = () => {
    const [friends,setFriends]=useState([])
    const [followed, setFollowed] = useState(true)
    const {id}=useParams();
    const token=localStorage.getItem("token")
    const userid=localStorage.getItem("userid");
    const {following,setFollowing}=useContext(userContext)
    console.log(following)
    useEffect(()=>{
       const getFriends=async()=>{
          try{
           const friendList=await api.get("/users/friendslist/"+id);
          console.log("frien",friendList)
           setFriends(friendList.data.data)
        
          }catch(err){
            console.log(err)
          }
       }
       getFriends()
    },[followed,id])
    const handleClick = async () => {
      
        try {
            if(followed){
                const responsone=await api.put("/users/"+id+"/unfollow",{"id":userid});
                console.log(responsone)
            }
            else {
                const response=await api.put("users/"+id+"/follow",{
                    headers:{
                        "token":token
                    }
                })
                console.log(response)
            }
           
            
      } catch (err) {
        console.log(err)
    }
    setFollowed(!followed)
}
  return (
    <>
     {userid !== id && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <ion-icon name="remove"></ion-icon>: <ion-icon name="add"></ion-icon>}
          </button>
        )}
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
    <h4 className="rightbarTitle">User Friends</h4>
    <div className="rightbarFollowings">
        {
            friends.map(friend=>(
                <div className="rightbarFollowing" key={friend._id}>
                    <Link to={'/profile/'+friend._id}>
                <img src={friend.profilePicture} alt="" className='rightbarFollowingImg' />
                <span className='rightbarFollowingName'>{friend.username}</span>
                </Link>
            </div>
            ))
        }
        
    </div>
    </>
  )
}

export default ProfileRightBar