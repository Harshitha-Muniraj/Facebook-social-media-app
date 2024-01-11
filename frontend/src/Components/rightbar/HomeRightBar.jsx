import React from 'react'
import { Users } from '../../PostData';
import Online from '../online/Online';
const HomeRightBar = () => {
  return (
    <>
    <div className="birthdayContainer">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxlDHVb5f0XFiYMXH52biThROssi_uDYe8ZQ&usqp=CAU" alt="" className='birthdayImg' />
          <span className='birthdayText'>
            <b>Kavya</b> and <b>3 other friends</b>  have birthday today 
          </span>
        </div>
        <img src="assets/boatseatop.png" alt="" className='rightbarAd' />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {
            Users.map(user=><Online key={user.id} user={user}/>)
          }
        </ul>
    </>
  )
}

export default HomeRightBar