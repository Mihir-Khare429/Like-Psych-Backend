const express = require('express')
const router = express.Router()
const User = require('../model/user')
const Room = require('../model/room')

router.get('/joinroom',(req,res) => {
    res.send('<h1>Join room</h1>')
})

router.post('/joinroom',async (req,res) => {
    const userCode = req.body.userCode
    const username = req.body.username
    try{
       const user = await User.findOne({userCode})
        if(!user){
            return res.send('User Code does not exist')
        }
        //Redirecting Part is Left
        const room = await Room.findOne({ userCode})
        if(!room){
            return res.json({
                message : "Room does not exist"
            })
        }
        else{
            room.members = room.members.concat({username})
            await room.save()
        }
        res.send(user.link)
    }catch(e){
        console.log(e)
    }
   
})

module.exports = router