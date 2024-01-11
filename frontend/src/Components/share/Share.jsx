import React from 'react'
import './Share.css'
const Share = () => {
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img src="/assets/tim.png" alt="userpic" className='shareProfileImg' />
                <input placeholder="Whats's in your mind" className='shareInput' />
            </div>
            <hr className='shareHr' />
            <div className="shareButtom">
                <div className="shareOptions">
                    <div className="shareOption">
                    <ion-icon name="images" id='shareIcon1'></ion-icon>
                        <span className='shareOptionText'>Photo or Video</span>
                    </div>
                    <div className="shareOption">
                    <ion-icon name="pricetag" id='shareIcon2'></ion-icon>
                        <span className='shareOptionText'>Tag</span>
                    </div>
                    <div className="shareOption">
                    <ion-icon name="location" id='shareIcon3'></ion-icon>
                        <span className='shareOptionText'>Location</span>
                    </div>
                    <div className="shareOption">
                    <ion-icon name="happy" id='shareIcon4'></ion-icon>
                        <span className='shareOptionText'>Feelings</span>
                    </div>
                </div>
                <button className='shareButton'>Share</button>
            </div>
        </div>
    </div>
  )
}

export default Share