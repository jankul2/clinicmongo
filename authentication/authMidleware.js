const jwt=require('jsonwebtoken');
require('dotenv').config();
const createError =require('http-errors');
class AuthMiddileware{
     constructor(){
        
     }
    static jwtVerify=async (req,res,next)=>{
        try{
            const tokenHeader=req.headers.authorization;
            if(!tokenHeader){
                next(createError(403,'A token is required for authentication')); 
            }else{
                const token=tokenHeader.split('Bearer')[1].trim();
                const decodeToken= await jwt.verify(token, process.env.SECRET_KEY);
                //console.log(decodeToken,'check-token')
                res.locals.tokenResults=decodeToken;
                next();
            }

        }catch(error){
            next(createError(404,'invalid token'));
        }

    }

}
module.exports=AuthMiddileware;