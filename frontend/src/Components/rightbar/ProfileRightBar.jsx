import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../customAxios/Axios';
import userContext from '../../context/StyleContext';
import { UserContext } from '../../context/UserContext';

const ProfileRightBar = () => {
    const [friends,setFriends]=useState([])
    const {user,dispatch}=useContext(UserContext);
    const {id}=useParams();
    
    const [followed, setFollowed] = useState(true)
    console.log("ss",user.following.includes(id))
    const token=localStorage.getItem("token")
    const userid=localStorage.getItem("userid");
    
    useEffect(()=>{
       const getFriends=async()=>{
          try{
           const friendList=await api.get("/users/friendslist/"+id);
         
           setFriends(friendList.data.data)
        
          }catch(err){
            console.log(err)
          }
       }
       getFriends()

        
  
    },[followed,user.following,id])

    // const handleClick = async () => {
    //     try {
    //       if (followed) {
    //         await axios.put(`/users/${user._id}/unfollow`, {
    //           userId: currentUser._id,
    //         });
    //         dispatch({ type: "UNFOLLOW", payload: user._id });
    //       } else {
    //         await axios.put(`/users/${user._id}/follow`, {
    //           userId: currentUser._id,
    //         });
    //         dispatch({ type: "FOLLOW", payload: user._id });
    //       }
    //       setFollowed(!followed);
    //     } catch (err) {
    //     }
    //   };
    const handleClick = async () => {
      console.log("in handle")
        try {
            if(followed){
                const responsone=await api.put("/users/"+id+"/unfollow",{"id":userid});
                console.log(responsone)
                dispatch({ type: "UNFOLLOW", payload:id });
            }
            else {
                console.log("tt",token)
                const response=await api.put("users/"+id+"/follow",{
                    "id":userid
                })
                console.log(response)
                dispatch({ type: "FOLLOW", payload:id });
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
            {followed==true ? "Unfollow" : "Follow"}
            {followed==true ? <ion-icon name="remove"></ion-icon>: <ion-icon name="add"></ion-icon>}
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
                <Link to={'/profile/'+friend._id} key={friend._id}>
                <div className="rightbarFollowing" key={friend._id}>
                   
                <img src={friend.profilePicture||'https://lastinch.in/wp-content/uploads/2020/09/blank-user.gif'} alt="" className='rightbarFollowingImg' />
                <span className='rightbarFollowingName'>{friend.username}</span>
                </div>
                </Link>
            
            ))
        }
        
    </div>
    </>
  )
}

export default ProfileRightBar