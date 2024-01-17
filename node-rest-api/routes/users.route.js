import express from 'express';
const userRouter=express.Router();
import { ResetPassword, followUser, getFriends, profilePicture, unfollowUser, updateUser } from '../controllers/user.js';
import { deleteUser } from '../controllers/user.js';
import { instaUser } from '../controllers/user.js';
import checkLogin from '../middleware/checkLogin.js';
import parser from '../utilities/uploadToCloudinary.js';


userRouter.put('/:id',updateUser)
userRouter.put("/resetpassword",ResetPassword);
userRouter.delete("/:id",deleteUser);
userRouter.get("/friendslist/:id",getFriends)
userRouter.get('/:id',instaUser);
userRouter.put('/:id/follow',checkLogin,followUser);
userRouter.put('/:id/unfollow',checkLogin,unfollowUser);
userRouter.post('/profilepicture',checkLogin,parser.single('img'),profilePicture)


export default userRouter;