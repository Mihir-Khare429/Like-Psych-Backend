require('../connection');
const mongoose = require('mongoose')
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
    }
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
const User = mongoose.model('User',userSchema)
module.exports = User