const express = require('express')
const PORT = process.env.PORT||7000
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const {userJoin, createRoomCode, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users')
const startQuiz = require('./utils/admin')
const { SSL_OP_NO_TICKET } = require('constants')

const app = express()
const server = http.createServer(app)
const io = exports.io = socketio(server)


app.use(express.static(path.join(__dirname,'public')))

const botName = 'GameBot'

io.on('connection', socket => {
    socket.on('joinRoom',async ({username,userCode}) => {
            
        const user = await userJoin(userCode,username,socket.id)
        socket.join(userCode)
        const rMembers = await getRoomUsers(userCode)
        socket.emit('dispRoom',userCode)
        io.in(userCode).emit('dispMem',rMembers)
        socket.emit('message', formatMessage(botName,'Welcome to the Game'));

        socket.broadcast.to(userCode).emit('message', formatMessage(botName,`${user.username} has joined the chat`));

        

        // const usernames = getRoomUsers(user.userCode)
        // io.to(user.userCode).emit('roomUsers', {
        //     userCode: user.userCode,
        //     users: usernames.username
        // })

        // getRoomUsers(user.userCode).then(function(usersnames) {
        //     io.to(user.userCode).emit('roomUsers', {
        //         userCode: user.userCode,
        //         users: usersnames
        //     })
        // }).catch(e => {
        //     console.log(e)
        // });
    })

    socket.on('quizInitiateRequest',async (data)=>{
        console.log(data)
        const quizData =await startQuiz(data)
        io.in(data.userCode).emit('quizQuestions',quizData)
    })

    socket.on('createRoom',async ({username}) => {
        const user = await createRoomCode(socket.id,username)
        socket.join(user.userCode)
        const rMembers = await getRoomUsers(user.userCode)
        socket.emit('dispRoom',user.userCode)
        io.in(user.userCode).emit('dispMem',rMembers)

        socket.emit('message', formatMessage(botName,'Welcome to the Game! The Game Code is '+user.userCode))

        // getRoomUsers(user.userCode).then(function(usersnames) {
        //     io.to(user.userCode).emit('roomUsers', {
        //         userCode: user.userCode,
        //         users: usersnames
        //     })
        // }).catch(e => {
        //     console.log(e)
        // });
    })
    
    // socket.on('chatMessage', (msg) => {
    //     const user = getCurrentUser(socket.id)

    //     io.to(user.userCode).emit('message', formatMessage(user.username,msg))
    // })

    // socket.on('disconnect', () => {
    //     const user = userLeave(socket.id)

    //     if(user){
    //         io.to(user.userCode).emit('message', formatMessage(botName, `${user.username} has left the chat`))

    //     getRoomUsers(user.userCode).then(function(usersnames) {
    //         io.to(user.userCode).emit('roomUsers', {
    //             userCode: user.userCode,
    //             users: usersnames
    //         })
    //     });
    //     }
    // })
})

server.listen(PORT, () => console.log("Server running on port "+PORT))