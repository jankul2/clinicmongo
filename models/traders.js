const mongoose = require('mongoose');
let tradersSechma=mongoose.Schema({
   type:{
     type:String,
     enum:['buy','sell'],
     default:'buy'
   },
   user_id:{
   type:Number,
   unique : true, 
   },
   symbol:{
   type:String,
   },
   shares:{
   type:Number,
   min: 1,
   max: 100
   },
   price:{
   type:Number,
   },
   timestamp:{
   type:Number,
   },
   datetime:{
    type:Date,
    default:new Date(),
    },
});

module.exports=mongoose.model('trades',tradersSechma);