import { Profiler, useContext, useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { UserContext } from "./context/UserContext";

function App() {
  
  const {theme,darkMode, lightMode}  =  useContext(UserContext);
  const user=localStorage.getItem("user")
  const [currentTheme, setCurrentTheme] = useState("lightMode");
  useEffect(()=>{
    const theme = localStorage.getItem("theme")
    if(theme=="lightMode"){
           setCurrentTheme("lightMode")
           lightMode()
           localStorage.setItem("theme","lightMode")
        }
   else if(theme=="darkMode"){
           setCurrentTheme("darkMode")
           darkMode()
           localStorage.setItem("theme","darkMode")
  }
    
},[])

  return (
    <div style={{color:`${theme.color}`,backgroundColor:`${theme.backgroundColor}`}}>

    
   <BrowserRouter>
      <Routes>
        
        <Route exact path="/" element={user!={} ? <Home /> : <Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}>
          
        </Route>
        <Route path="/profile/:id" element={<Profile/>} />
      </Routes>
   </BrowserRouter>
   </div>
  );
}

export default App;
