const express = require('express')
const  router = express.Router()
const User = require('../model/user')
const Room = require('../model/room')
const { auth } = require('../middlewares/auth')

router.get('/rooms/:code', auth , async (req,res) => {
    const userCode = req.verifyCode
    try{
        if(req.params.code == req.verifyCode){
            const room = await Room.findOne({userCode})
            const member = []
            for( var i = 0; i <= room.members.length ; i++){
                const data = {
                    username : room.members[i][username], //Working on this
                    role : room.members[i][role]
                }
                member.push(data)
            }
            return res.send(member)
        }
       else{
           res.status(401).json({
               message : "Please Authenticate by entering code at Joinroom"
           })
       }
    }catch(e){
        console.log(e)
    }
})

module.exports = router