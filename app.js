const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');
const routesTraders = require('./routes/traderRoute.js');
const createError=require('http-errors');
require('./lib/database.js');
const path=require('path');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, '..', 'public','assets', 'images')))
app.use('/api', routes);
app.use('/traders', routesTraders);

app.use((req,res,next)=>{
    next(createError(404,'page not found!'));
});
app.use((err,req,res,next)=>{
  const status=err.status || 500;
   res.status(status);
   res.send({error:{success:0,message:err.message}});
});
module.exports=app;