const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');
const createError=require('http-errors');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database=mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', routes);
app.use((req,res,next)=>{
    next(createError(404,'page not found!'));
});
app.use((err,req,res,next)=>{
  const status=err.status || 500;
   res.status(status);
   res.send({error:{success:0,message:err.message}});
});
module.exports=app;