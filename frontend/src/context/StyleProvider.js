import { useState } from "react";
import StyleContext from "./StyleContext.js";

const darkTheme={
    color: "white",
                backgroundColor: "black",
                border: "2px solid green"
}
const lightTheme = {
    color: "black",
    backgroundColor: "white",
    border: "2px solid red"

}

const StyleProvider = ({ children }) => {
    const [username,setUsername]=useState(localStorage.getItem("username")?localStorage.getItem("username"):null)
    const [theme, setTheme] = useState(lightTheme);
    const [profilePicture,setProfilePicture]=useState(localStorage.getItem("userpic")?localStorage.getItem("userpic"):null)
    const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):null)
    const [gmail,setGmail]=useState(localStorage.getItem("gmail")?localStorage.getItem("gmail"):null)

     const contextData={
        username:username,
        theme:theme,
        setUsername:setUsername,
        gmail,
        setGmail,
        token,
        setToken,
        profilePicture,
        setProfilePicture,
        lightMode: ()=>setTheme(lightTheme),
        darkMode: ()=>setTheme(darkTheme)

     }

    return(
        <StyleContext.Provider value={contextData}>
              {children}
        </StyleContext.Provider>
    )
}

export default StyleProvider;