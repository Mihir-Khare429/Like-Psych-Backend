const Room = require('../model/room')
const express = require('express')
require('../connection')
const { codeGenerate } = require('../middlewares/randstring')
const io = require('../server').io

// function userJoin(id,username,userCode) {
//     var cnt = 0;
//     Room.findOne({userCode}).then(roomName => {
//             for(const mem of roomName.members){
//                 cnt++;
//             }
//             roomName.members[cnt] = {username: username, id: id}
//             Room.updateOne({userCode: userCode},{members: roomName.members}).then(result => {
//                 console.log(result)
//             }).catch(er => {
//                 console.log(er)
//             })        
//     }).catch(err => {
//         console.log('User Code not available')
//     })
//     const user1 = {id,username,userCode}
//     return user1
// }

const userJoin = async function(userCode,username,id){
    try{
        var room  = await Room.findOne({userCode})
        if(!room){
            return{
                success : false ,
                message : "No Room Registered with the userCode Entered"
            }
        }
        var members = room.members // Array of Objects
        var temp = {username: username, id: id}
        members.push(temp)
        room.members = members
        await room.save()
        // var finalObj =[]
        // members.forEach(mem => {
        //     var t = {
        //         username : mem.username,
        //         role : mem.role
        //     }
        //     finalObj.push(t)
        // })
        return temp
    }catch(err){
        console.log('Error with the userJoin function')
        console.log(err)
    }
}

// function createRoomCode(id,username){
//     const data = codeGenerate(username)
//     const user = new Room({userCode: data.userCode,members:{username: username,id: id,role: 1}})
//     user.save()
//     return user
// }

const createRoomCode = async function(id,username){
    try{
        const data = codeGenerate(username)
        const user = new Room({userCode: data.userCode,members:{username: username,id: id,role: 1}})
        await user.save()
        return user
    }catch(err){
        console.log('Error with create Room Code')
        console.log(err)
    }
}

const getCurrentUser = async function(id){
    try{
        return await users.find(user => user.id === id)
    }catch(err){
        console.log('Error with getCurrentUser function')
        console.log(err)
    } 
}

// function userLeave(id){
//     //Room.findOneAndDelete({members})
//     const index = users.findIndex(user => user.id === id)
//     if(index !== -1){
//         return users.splice(index,1)[0]
//     }
// }
const userLeave = async function(id){
    try{
        const index = await users.findIndex(user => user.id === id)
        if(index !== -1){
            return users.splice(index,1)[0]
        }
    }catch(err){
        console.log('Error with user Leave function')
        console.log(err)
    }
}

// function getRoomUsers(userCode){
//     Room.findOne({userCode}).then(roomName => {
//         return roomName.members
//     })
//     //return users.filter(user => user.room === room)
// }

const getRoomUsers = async function(userCode) {
    try{
        var room = await Room.findOne({userCode})
        if(!room){
            throw new Error("No Room Registered with the userCode Entered")
        }
        var users = room.members         // Array of Objects
        var finalObj = []
        for(var i =0 ; i<users.length ;i++){
            var temp = {
                username : users[i].username,
                role : users[i].role
            }
            finalObj.push(temp)
        }
        return finalObj
    }catch(err){
        console.log('Error with getRoomUsers function.')
        console.log(err)
    }
}


module.exports = {
    userJoin,
    createRoomCode,
    getCurrentUser,
    userLeave,
    getRoomUsers
}