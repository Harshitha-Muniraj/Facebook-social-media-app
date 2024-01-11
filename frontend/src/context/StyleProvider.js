import { useState } from "react";
import StyleContext from "./StyleContext.js";


const initialTheme = {
    color: "black",
    backgroundColor: "white",
    border: "2px solid red"

}

const StyleProvider = ({ children }) => {

    const [theme, setTheme] = useState(initialTheme);

     

    return(
        <StyleContext.Provider value={
            {
             theme:theme,
             lightMode: ()=>setTheme(initialTheme),
             darkMode: ()=>setTheme({
                color: "white",
                backgroundColor: "black",
                border: "2px solid green"
             }),
            
            
            }
            }>
              {children}
        </StyleContext.Provider>
    )
}

export default StyleProvider;