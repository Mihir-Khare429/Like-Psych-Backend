const jwt = require('jsonwebtoken')

exports.auth = async function(req,res,next) {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decode = jwt.verify(token,'psychsecretstring')
        req.verifyCode = decode.userCode
    }catch(e){
        console.log(e)
    }
    next()
}