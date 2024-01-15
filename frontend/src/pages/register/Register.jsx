import React,{useState} from 'react';
import './Register.css';
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'

const Register = () => {
    let navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleRegister = async() => {
        try {
          let response= await axios.post("/auth/signup",{
            username,
            email,
            password
           })
           console.log("userdetails: ",response.data.message)
           alert(response.data.message)
           if(response.data.success){
            return navigate("/login")
           }
        } catch (error) {
          console.log("err in sign up",error)
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
                    <input type="text" className='loginInput' placeholder='Username' onChange={(e)=>setUsername(e.target.value)} />
                    <input type="email" className='loginInput' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" className='loginInput' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                    <input type="password" className='loginInput' placeholder='Confirm Password'/>
                    <button className="loginButton" onClick={handleRegister}>Sign Up</button>
                   
                    <Link to='/login'><button className="loginRegisterButton">Log into Account</button></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register;