const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')
const startQuiz = document.getElementById('startQuiz')

const {username, userCode} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io()

if(!userCode){
    socket.emit('createRoom', {username})
} else {
    socket.emit('joinRoom', {username, userCode})
}


socket.on('roomUsers', ({userCode, users}) => {
    outputRoomName(userCode)
    outputUsers(users)
})

socket.on('message', message => {
    outputMessage(message)
    chatMessages.scrollTop = chatMessages.scrollHeight
})

socket.on('dispMem',(data)=>{
    const members = JSON.stringify(data)
    outputUsers(members)
})

socket.on('dispRoom',(data)=> {
    outputRoomName(data)
})

startQuiz.addEventListener('click',function(){
    let user = {
        userCode : roomName.innerText,
        role : 1,
        id:socket.id
    }
    console.log(user)
    socket.emit('quizInitiateRequest',user)
})

socket.on('quizQuestions',(data)=> {
    console.log(data)
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const msg = e.target.elements.msg.value
    
    socket.emit('chatMessage', msg)

    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

function outputRoomName(userCode) {
    roomName.innerText = userCode
}

function outputUsers(users){
    const data = JSON.parse(users)
    console.log(data)
    // userList.innerHTML = data[0].username
    userList.innerHTML = `
        ${data.map(dat => `<li>${dat.username}</li>`).join('')}
    `
}