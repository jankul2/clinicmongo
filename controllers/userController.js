const createError=require('http-errors');
const UserModel=require('../models/users.js');
const Authentication=require('../authentication/authentication.js');
const bcrypt=require('bcrypt');
const multer=require('multer');

class UserController{
 userLogin= async (req,res,next)=>{
    try{
    const {email,password}=req.body;
    const userPass= await UserModel.find({email:email},{"password":1});
    const match = await bcrypt.compare(password,userPass[0].password);
    if(match){
       const token=await Authentication.jwtCreate(email,password);
       res.send({success:1,token:token});
    }else{
        next(createError(404,'password does not match!'));
    }

    }catch(error){
      next(createError(404,error));
    }
 
 }

 userRegister= async (req,res,next)=>{
    try {

    let checkEmail= await UserModel.findOne({email:req.body.email});
    if(checkEmail){ 
        throw 'email already checked!';
    }
   
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password=hashPassword;
    const userReg = new UserModel(req.body);
    
        const userRegInfo = await userReg.save();
       
        let data={success:1,dataInfo:userRegInfo};
        res.send(data);
      
    }
    catch (error) {
        next(createError(404,{success:0,message:error}));
    }
 }

 userProfile=(async (req,res,next)=>{
    let email=res.locals.tokenResults.id;
    const profileInfo=await UserModel.find({email:email});
    res.send({success:1,dataInfo:profileInfo});
 });

}
module.exports=UserController;