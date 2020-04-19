const express = require('express')
const router = express.Router()
const { codeGenerate } = require('../middlewares/randstring')
const User = require('../model/user')
const Room = require('../model/room')
// const { auth } = require('../middlewares/auth')

router.get('/createroom',(req,res) => {
    res.send('<h1>Create Room Page</h1>')
})

router.post('/createroom', async (req,res) => {
    const username = req.body.username
    var data = codeGenerate(username)
    try{
        const valid = await User.isUniqueCode(data.userCode)
        var link = 'localhost:7000/rooms/' + data.userCode
        if( valid == true){
            const user = new User({
                ... data,
                link 
            })
            await user.generateToken(data.userCode)
            await user.save()
            const roomObject = new Room({
                userCode : data.userCode
            })
            roomObject.members = roomObject.members.concat({username,role : 0})
            await roomObject.save()
            res.status(200).send(user)
        }
        else{
            res.send('Error')
        }
    }catch(e){
        console.log(e)
    }
   
})

module.exports = router