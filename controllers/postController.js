const createError=require('http-errors');
const PostsModel=require('../models/posts.js');
const Authentication=require('../authentication/authentication.js');
const bcrypt=require('bcrypt');
const multer=require('multer');
class PostController{
 
    addPost=(async (req,res,next)=>{
    try{
    const PostsAdd = new PostsModel({
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        post_image: req.body.post_image
    });
        const userRegInfo = await PostsAdd.save();
        let data={success:1,dataInfo:userRegInfo};
        res.send(data);
      
    }
    catch (error) {
        next(createError(404,{success:0,message:error}));
    }
 });

}
module.exports=PostController;