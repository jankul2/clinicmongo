const createError=require('http-errors');
const {PostsModel,CommentsModel,CateModel}=require('../models/posts.js');
const Authentication=require('../authentication/authentication.js');
const bcrypt=require('bcrypt');
const multer=require('multer');
class PostController{

addPost=(async (req,res,next)=>{
    try{
        console.log(req.file,'postcontoller');
    const PostsAdd = new PostsModel(req.body);
        const userRegInfo = await PostsAdd.save();
        let data={success:1,dataInfo:userRegInfo};
        res.send(data);
      
    }
    catch (error) {
        next(createError(404,{success:0,message:error.message.code}));
    }
 });
 addCategeory=(async (req,res,next)=>{
    try{
        console.log(req.body);
    const CateAdd = new CateModel(req.body);
        const userRegInfo = await CateAdd.save();
        let data={success:1,dataInfo:userRegInfo};
        res.send(data);
    }
    catch (error) {
        next(createError(404,{success:0,message:error.message}));
    }
 });
 addComment=(async (req,res,next)=>{
    try{
        const CommentAdd = new CommentsModel({message:req.body.message,user_id:req.body.user_id,});
        let id=req.body.post_id;
        const userRegInfo = await CommentAdd.save();
        const postRelated = await PostsModel.findById(id);
        postRelated.comments.push(CommentAdd);
        //console.log(postRelated,'test');
        postRelated.save();

        let data={success:1,dataInfo:userRegInfo};
        res.send(data);
    }
    catch (error) {
        next(createError(404,{success:0,message:error.message}));
    }
 });
 allComment=(async (req,res,next)=>{
    try{
        CommentsModel.find({}).populate('posts').exec((err,docs)=>{
          res.send(docs);
        });
        //let data={success:1,dataInfo:userRegInfo};
        //res.send(data);
    }
    catch (error) {
        next(createError(404,{success:0,message:error.message}));
    }
 });
}
module.exports=PostController;