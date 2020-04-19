const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    userCode : {
        type : String,
        required : true,
        trim : true
    },
    members : [{
        username : {
            type : String
        },
        role : {
            type : Number,
            default : 1
        },
        token : {
            type : String,
            require : true
        }
    }]
})

roomSchema.methods.toJSON = function(){
    const room = this
    const roomObject = room.toObject()
    delete roomObject._id
    return roomObject
}

const Room = mongoose.model('Room',roomSchema);

module.exports = Room