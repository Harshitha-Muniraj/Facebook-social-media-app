import React from 'react';
import './Register.css'

const Register = () => {
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">FbGram</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on FbGram
                </span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <input type="text" className='loginInput' placeholder='Username' />
                    <input type="email" className='loginInput' placeholder='Email' />
                    <input type="password" className='loginInput' placeholder='Password'/>
                    <input type="password" className='loginInput' placeholder='Confirm Password'/>
                    <button className="loginButton">Sign Up</button>
                   
                    <button className="loginRegisterButton">Log into Account</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register;