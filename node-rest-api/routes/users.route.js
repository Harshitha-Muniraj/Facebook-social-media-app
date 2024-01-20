import express from 'express';
const userRouter=express.Router();
import { ResetPassword, coverPicture, followUser, getAllUsers, getFriends, profilePicture, unfollowUser, updateUser } from '../controllers/user.js';
import { deleteUser } from '../controllers/user.js';
import { instaUser } from '../controllers/user.js';
import checkLogin from '../middleware/checkLogin.js';
import parser from '../utilities/uploadToCloudinary.js';


userRouter.put('/:id',updateUser);
userRouter.put("/resetpassword",ResetPassword);
userRouter.delete("/:id",deleteUser);
userRouter.get("/friendslist/:id",getFriends)
userRouter.get('/:id',instaUser);
userRouter.get('/all/allusers',checkLogin,getAllUsers)
userRouter.put('/:id/follow',followUser);
userRouter.put('/:id/unfollow',unfollowUser);
userRouter.post('/profilepicture',checkLogin,parser.single('img'),profilePicture);
userRouter.post('/coverpicture',checkLogin,parser.single('img'),coverPicture)


export default userRouter;