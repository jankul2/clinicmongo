const createError=require('http-errors');
const TradersModel=require('../models/traders');

class TradersController{
 

 tradersAdd= async (req,res,next)=>{
    try {  
    const userReg = new TradersModel(req.body);
    
        const userRegInfo = await userReg.save();
       
        let data={success:1,dataInfo:userRegInfo};
        res.send(data);
      
    }
    catch (error) {
        next(createError(404,{success:0,message:error.message}));
    }
 }

 traderList=(async (req,res,next)=>{
    let queryString=req.query;
    let profileInfo=await TradersModel.find(queryString);
    
    res.send({success:1,dataInfo:profileInfo});
 });

}
module.exports=TradersController;