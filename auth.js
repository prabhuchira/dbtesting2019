const userModel = require('./userModel');
const jwt = require('jsonwebtoken');
const auth = async (req,res,next)=>{
 
    const token = req.header('Authorization').replace('Bearer','');
    // console.log(token)
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    
    

    const user = await userModel.findOne({
        _id:decoded._id,'tokens.token':token
    })
    
    req.user = user;
    req.token = token;
  
    
    next();
}

module.exports = auth;