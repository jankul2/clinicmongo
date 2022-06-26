const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:  {
    type:String,
    unique:true,
    sparse:true
   },
  author: String,
  content: String,
  categories:[],
  date: { type: Date, default: Date.now },
  feature_image:{
    type:String,
  },
  post_type:{
    type:String,
    enum : ['publish','pending',"draft"],
     defult:'pending',
     required:true,
  },
  // a blog post can have multiple comments, so it should be in a array.
  // all comments info should be kept in this array of this blog post.
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }]
});
const commentSchema= new mongoose.Schema({
  message:{
    type:String
  },
  user_id:{
    type:String
  },
  date: {
    type: Date,
    default: Date.now
 },
});
const cateSchema= new mongoose.Schema({
  cate_name:{
    type:String,
    unique:true,
    require:true,
  },
  cate_descreption:{
    type:String
  },
  category_image:{
    type:String,
  },
  created:{
    type:String,
    timestamps: true
  }
  
});

let PostsModel=mongoose.model('posts', blogSchema);
let CommentsModel=mongoose.model('comments', commentSchema);
let CateModel=mongoose.model('categories', cateSchema);
module.exports = {PostsModel,CommentsModel,CateModel}