import React,{useState,useContext} from 'react';
import './Login.css';

import axios from 'axios';
import { loginCall } from "../../apiCall";
import {Link,useNavigate} from "react-router-dom"
import { UserContext } from '../../context/UserContext';

const Login = () => {
    // let {username,setProfilePicture,setUsername,following,setFollowing,token,setToken,gmail,setGmail}=useContext(userContext);
    const navigate=useNavigate()
    const {dispatch,isFetching, pic,
      setPic,
      userid,
      setUserid,
      token,
      setToken}=useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async(e) => {
      e.preventDefault()
      
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post("http://localhost:5000/api/auth/login", {email,password});
          console.log(res.data.data)
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
          setPic(res.data.data.profilePicture)
          localStorage.setItem("userid",res.data.data._id)
          localStorage.setItem("userpic",res.data.data.profilePicture)
          localStorage.setItem("token",res.data.data.token)
          alert(res.data.message)
          navigate("/")
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err });
        }
      };
      // try {
      //   // let response= await axios.post("http://localhost:5000/api/auth/login",{
      //   //   email,
      //   //   password
      //   //  })
      //    console.log("rr",response)
      //    if(response.data.success){
      //     setFollowing([...following,response.data.data.following])
      //     setToken(response.data.data.token)
      //     setUsername(response.data.data.username)
      //     setGmail(response.data.data.email);
      //     setProfilePicture(response.data.data.profilePicture)
      //     localStorage.setItem("userid",response.data.data._id)
      //     localStorage.setItem("userpic",response.data.data.profilePicture)
      //     localStorage.setItem("token",response.data.data.token)
      //     console.log("login",token)
      //     localStorage.setItem("username",username)
      //     localStorage.setItem("gmail",response.data.data.email)
      //     alert(response.data.message)
      //     navigate("/")
      //    }
      //    else{
          
      //    alert(response.data.message)
      //    }
      
      // } catch (error) {
      //   console.log("err in login",error)
      // } 
    
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
                    <input type="email" className='loginInput' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" className='loginInput' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="loginButton" type='submit'>Log In</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <Link to='/register'><button className="loginRegisterButton">Create a New Account</button></Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login