const express = require('express')
const app = express()
const port = process.env.port || 7000
const bodyParser = require('body-parser')
const createRoom = require('./routes/createroom')
//Middlewares
app.use(bodyParser.json())


//Routes
app.use('/psych',createRoom)


app.listen(port,() => {
    console.log('Server running at port : ' + port)
})