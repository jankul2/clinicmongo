const express=require('express');
const UserModel = require('../models/users');
const UserController=require('../controllers/userController.js');
const PostController=require('../controllers/postController.js');
const AuthMiddileware=require('../authentication/authMidleware.js');
const router=express.Router();
const userCon=new UserController;
const PostCon=new PostController;
router.post('/login',userCon.userLogin);
router.post('/register',userCon.userRegister);
router.get('/profile',AuthMiddileware.jwtVerify,userCon.userProfile);
router.post('/addpost',AuthMiddileware.jwtVerify,PostCon.addPost);
module.exports=router;