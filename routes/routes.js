const express=require('express');
const {PostsModel,CommentsModel,CateModel}=require('../models/posts.js');
const UserModel = require('../models/users');
const UserController=require('../controllers/userController.js');
const PostController=require('../controllers/postController.js');
const AuthMiddileware=require('../authentication/authMidleware.js');
const Authentication=require('../authentication/authentication.js');
const router=express.Router();
const userCon=new UserController;
const PostCon=new PostController;
router.post('/login',userCon.userLogin);
router.post('/register',userCon.userRegister);
router.get('/profile',AuthMiddileware.jwtVerify,userCon.userProfile);
router.post('/addpost',[AuthMiddileware.jwtVerify],PostCon.addPost);
router.post('/addcategory',[AuthMiddileware.jwtVerify],PostCon.addCategeory);
router.post('/addcomment',[AuthMiddileware.jwtVerify],PostCon.addComment);
router.get('/allcomment',[AuthMiddileware.jwtVerify],PostCon.allComment);
router.get('/getinfo',async (req,res)=>{
    PostsModel.find({}).populate({path:'comments',match: { message: 'this is very awsome post new 2' }}).exec((err,docs)=>{
        res.send(docs);
      });
})
module.exports=router;