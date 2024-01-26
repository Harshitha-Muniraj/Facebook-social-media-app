import customResponse from "../utilities/customResponse.js";
import User from "../model/User.modal.js";

const checkLogin = async (req, res, next) => {
      const {token} = (req.headers); 
     
      if(!token){
            return customResponse(res,400, false, "Please provide token", null)
      }
    
      const foundUser = await User.findOne({token : token})
      
        if(foundUser == null){
            
                return customResponse(res,400, false, "Invalid token", null)
        }
      
        req.user = foundUser;

        next()

}

export default checkLogin;