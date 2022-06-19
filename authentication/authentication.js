const jwt=require('jsonwebtoken');
require('dotenv').config();
const createError =require('http-errors');
const uploadConfigration=require('../authentication/uploadConfig.js');
class Authentication{
    static jwtCreate= async (id,email)=>{
        try{
          const token= await jwt.sign({id:id,email:email},process.env.SECRET_KEY,{expiresIn:'1day'});
          return token;
          
        }catch(error){
            createError(404,error);
            
        }
    }

    static uploadConfig = async(req,res,next)=> {
        const uploadinfo = uploadConfigration.single('profile_picture'); 
          uploadinfo(req, res, function (err) {
            if (err) {
                next(createError(500,err.message));  
                return ;
            } 
            if (req.file== undefined) {
              next(createError(500,'image field is required !'));  
              return ;
          }
            if(!req.file || Object.keys(req.file).length==0){
                next(createError(402,'image is required!'));   
            }
            //console.log(req.file,'papa')
            res.locals.filename=req.file.filename;
            next();
        })
    }

}
module.exports=Authentication;