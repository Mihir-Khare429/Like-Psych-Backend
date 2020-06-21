require('../connection');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
        trim : true,
        min : 6
    },
    userCode : {
        type : String,
        unique : true,
        require : true,
    },
    role : {
        type : Number,
        default : 0   // 0 For Admin
    },
    link : {
        type : String,
        require : true
     },
     tokens : [{
         token : {
             type : String,
             require : true
         }
     }]
})

userSchema.statics.isUniqueCode = async function(somestring) {
    try {
        const user = await User.findOne( { userCode : somestring})
        if(!user){
            return true
        }
        else{
            return false
        }
    }catch(e){
        console.log(e)
    }
}

userSchema.methods.generateToken = async function(usercode){
    const user = this
    const token = jwt.sign({ '_id' : user._id , 'userCode' : usercode},'psychsecretstring')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
const User = mongoose.model('User',userSchema)
module.exports = User