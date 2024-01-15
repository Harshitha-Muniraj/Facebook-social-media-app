import express from "express";
const postsRouter=express.Router();
import parser from "../utilities/uploadToCloudinary.js";
import { createPost, likeDislike, myPosts, timelinePost } from "../controllers/post.js";
import checkLogin from "../middleware/checkLogin.js";

postsRouter.post('/uploadpost',checkLogin,parser.single('img'),createPost);
postsRouter.get('/getmyposts/:id',myPosts)
postsRouter.get('/timeline/:id',timelinePost)
postsRouter.put('/:id/like',likeDislike)

export default postsRouter;