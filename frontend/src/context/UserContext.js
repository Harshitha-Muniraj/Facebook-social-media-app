import { createContext, useEffect, useReducer, useState } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user"))|| "",
  isFetching: false,
  error: false,

};


export const UserContext = createContext(INITIAL_STATE);

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
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  
    const [theme, setTheme] = useState(lightTheme);
  
  const [pic,setPic]=useState(localStorage.getItem("userpic")?localStorage.getItem("userpic"):null)
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        pic,
        setPic,
        
        theme:theme,
        lightMode: ()=>setTheme(lightTheme),
        darkMode: ()=>setTheme(darkTheme),

       

      }}
    >
      {children}
    </UserContext.Provider>
  );
};