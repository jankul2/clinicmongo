const express=require('express');
const UserModel = require('../models/users');
const TradersController=require('../controllers/tradersController.js');

const router=express.Router();
const tradersCon=new TradersController;
router.post('/create',tradersCon.tradersAdd);
router.get('/all',tradersCon.traderList);


module.exports=router;