import React,{useState,useContext} from 'react';
import './Login.css';
import userContext from '../../context/StyleContext';
import axios from 'axios';
import {Link,useNavigate} from "react-router-dom"

const Login = () => {
    let {username,setProfilePicture,setUsername,token,setToken,gmail,setGmail}=useContext(userContext);
    const navigate=useNavigate()
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async() => {
      try {
        let response= await axios.post("http://localhost:5000/api/auth/login",{
          email,
          password
         })
         console.log("rr",response)
         if(response.data.success){
          setToken(response.data.data.token)
          setUsername(response.data.data.username)
          setGmail(response.data.data.email);
          setProfilePicture(response.data.data.profilePicture)
          localStorage.setItem("userid",response.data.data._id)
          localStorage.setItem("userpic",response.data.data.profilePicture)
          localStorage.setItem("token",response.data.data.token)
          console.log("login",token)
          localStorage.setItem("username",username)
          localStorage.setItem("gmail",response.data.data.email)
          alert(response.data.message)
          navigate("/")
         }
         else{
          
         alert(response.data.message)
         }
      
      } catch (error) {
        console.log("err in login",error)
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
                <div className="loginBox">
                    <input type="email" className='loginInput' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" className='loginInput' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="loginButton" onClick={handleLogin}>Log In</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <Link to='/register'><button className="loginRegisterButton">Create a New Account</button></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login