const express = require('express')
const router = express.Router()
const { codeGenerate } = require('../middlewares/randstring')
const User = require('../model/user')

router.get('/createroom',(req,res) => {
    res.send('<h1>Create Room Page</h1>')
})

router.post('/createroom',async (req,res) => {
    const username = req.body.username
    var data = codeGenerate(username)
    try{
        const valid = await User.isUniqueCode(data.userCode)
        var link = 'wwww.something.com/rooms/' + data.userCode.replace(' ','')
        if( valid == true){
            const user = new User({
                ... data,
                link 
            })
            user.save()
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