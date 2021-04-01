var jwt =require('jsonwebtoken');
var config=require('./config');

exports.getToken = (user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin},config.JWT_SECRET,{
       expiresIn:'48h' 
    });
};

exports.isAuth = (req,res,next)=>{
  
    const token=req.headers.authorization;
  
if(token){
    const onlyToken=token.slice(6,token.length);
    jwt.verify(onlyToken,config.JWT_SECRET,(err,decode)=>
    {
        if(err){
            return res.status(401).send({msg:'Invalid Token'});
     }
        req.user=decode;
        next();
        return
    });
}else{
    return res.status(401).send({msg:"Token is not supplied"});
}

}

exports.isAdmin = (req,res,next) =>{
    
    console.log(req.User);

    if(req.user && req.user.isAdmin){
       
  
        return next();
       
    }
  
    return res.status(401).send({msg:'Admin Token is not valid'})
}
