import React,{useState,useContext} from 'react';
import './Login.css';

import axios from 'axios';

import {Link,useNavigate} from "react-router-dom"
import { UserContext } from '../../context/UserContext';

const Login = () => {
    // let {username,setProfilePicture,setUsername,following,setFollowing,token,setToken,gmail,setGmail}=useContext(userContext);
    const navigate=useNavigate()
    const {dispatch,isFetching,error,pic,
      setPic,
      }=useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async(e) => {
      e.preventDefault()
      
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post("http://localhost:5000/api/auth/login", {email,password});
          
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
          setPic(await res.data.data.profilePicture)
          localStorage.setItem("userid",res.data.data._id)
          localStorage.setItem("userpic",pic)
          localStorage.setItem("token",res.data.data.token)
         
          navigate("/")
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err });
          
        }
      };
     
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
                <form className="loginBox" onSubmit={handleLogin}>
                  
                    <input type="email" className='loginInput' required placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" className='loginInput' required placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="loginButton" type='submit'  disabled={isFetching}>
                    {isFetching ? (
                <ion-icon name="refresh"></ion-icon>
              ) : (
                "Log In"
              )}
                      </button>
                    <span className="loginForgot">Forgot Password?</span>
                    <Link to='/register'><button className="loginRegisterButton">Create a New Account</button></Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login