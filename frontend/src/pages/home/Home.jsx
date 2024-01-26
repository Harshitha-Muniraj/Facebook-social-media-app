import React from 'react'
import TopBar from '../../Components/topBar/TopBar'
import Sidebar from '../../Components/sidebar/Sidebar'
import Feed from '../../Components/feed/Feed';
import Rightbar from '../../Components/rightbar/Rightbar';
import './Home.css'

const Home = () => {
  
  return (
    <div>
    <TopBar />
    <div className="homeContainer">
      <Sidebar/>
      <Feed/>
      <Rightbar/>
    </div>
    
    </div>
  )
}

export default Home