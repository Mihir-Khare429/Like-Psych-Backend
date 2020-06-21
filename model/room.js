const mongoose = require('mongoose');
const roomSchema = mongoose.Schema({
    userCode : {
        type : String,
        required : true,
        trim : true
    },
    members : [{
        username : {
            type : String
        },
        token : {
            type : String
        },
        id:{
            type: String
        },
        role:{
            type: Number,
            default: 0
        }
    }]
})

// roomSchema.methods.toJSON = function(){
//     const room = this
//     const roomObject = room.toObject()
//     delete roomObject._id
//     return roomObject
// }

const Room = mongoose.model('Room',roomSchema);

module.exports = Room