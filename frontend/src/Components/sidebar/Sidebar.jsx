import React, { useContext, useEffect, useState } from 'react';
import './Sidebar.css';
import api from '../../customAxios/Axios';
import {Users} from '../../PostData';
import FollowList from '../followList/followList';

import { UserContext } from '../../context/UserContext.js';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [suggestion,setSuggestion]=useState([]);
    const {user}=useContext(UserContext);
    const token=localStorage.getItem("token")
    
    let navigate=useNavigate();
    useEffect(()=>{
      const getsuggestion=async()=>{
     
        try{
          const res=await api.get("/users/all/allusers",{
            headers:{
              "token":token
            }
          });
          setSuggestion(await res.data.data)
        }catch(err){
          console.log(err)
        }
      }
      getsuggestion()
    },[user.following])
  const {theme,darkMode, lightMode}  =  useContext(UserContext)
  const [currentTheme, setCurrentTheme] = useState("lightMode");
function logout(){
  localStorage.setItem("user",JSON.stringify(""))
  localStorage.setItem("userid",JSON.stringify(""))
  localStorage.setItem("userpic",JSON.stringify(""))
  
  navigate("/login")
}
function switchTheme(){
    if(currentTheme=="lightMode"){
           setCurrentTheme("darkMode")
           darkMode()
           localStorage.setItem("theme","darkMode")
        }
   else if(currentTheme=="darkMode"){
           setCurrentTheme("lightMode")
           lightMode()
           localStorage.setItem("theme","lightMode")
  }

}
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <ion-icon name="logo-rss" id='sidebarIcon'></ion-icon>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
          <ion-icon name="chatbubble-outline" id='sidebarIcon'></ion-icon>
            <span className="sidebarListItemText">Messenger</span>
          </li>
          <li className="sidebarListItem">
          <ion-icon name="caret-forward-circle-outline" id='sidebarIcon'></ion-icon>
            <span className="sidebarListItemText">Video</span>
          </li>
          <li className="sidebarListItem">
          <ion-icon name="people-outline" id='sidebarIcon'></ion-icon>
            <span className="sidebarListItemText">Group</span>
          </li>
          <li className="sidebarListItem">
          <ion-icon name="bookmark-outline" id='sidebarIcon'></ion-icon>
            <span className="sidebarListItemText">BookMarks</span>
          </li>
          <li className="sidebarListItem">
            <ion-icon name="moon-outline" id='sidebarIcon'></ion-icon>
            <span style={{cursor:'pointer'}} className="sidebarListItemText" onClick={switchTheme} >Theme</span>
            
          </li>
          <li className="sidebarListItem">
            <ion-icon name="log-out-outline" id='sidebarIcon'></ion-icon>
            <span style={{cursor:'pointer'}} className="sidebarListItemText" onClick={logout} >Log out</span>
            
          </li>
        </ul>
        <button className='sidebarButton'>More</button>
        <hr className='sidebarHr'/>
        <ul className='sidebarFriendList'>
          {
            suggestion.map(sug=><FollowList key={sug.id} sug={sug}/>)
          }
          
        </ul>
      </div>
    </div>
  )
}

export default Sidebar