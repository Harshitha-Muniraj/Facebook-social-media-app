import React from 'react';
import './TopBar.css';
import { Link } from 'react-router-dom';


const TopBar = ({userpic}) => {
  return (
    <div className='topbarContainer'>
        <div className='topbarLeft'>
            <Link to='/'>
            <span className='logo'>FbGram</span>
            </Link>
            
        </div>
        <div className='topbarCenter'>
            <div className='searchBar'>
            <ion-icon name="search" id='searchIcon'></ion-icon>
                <input type="text" placeholder='Search for friends,posts' className='searchInput'/>
            </div>
        </div>
        <div className='topbarRight'>
            <div className='topbarLinks'>
                <span className='topbarLink'>Homepage</span>
                <span className='topbarLink'>TimeLine</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                <ion-icon name="person" id='icon-font'></ion-icon>
                    <span className='topbarIconBadge'>1</span>
                </div>
                <div className="topbarIconItem">
                    <ion-icon name="chatbubbles" id='icon-font'></ion-icon>
                    <span className='topbarIconBadge'>2</span>
                </div>
                <div className="topbarIconItem">
                <ion-icon name="notifications" id='icon-font'></ion-icon>
                    <span className='topbarIconBadge'>3</span>
                </div>
            </div>
            <img src={userpic} alt="profile-pic" className='topbarImg' />
        </div>
    </div>
  )
}

export default TopBar