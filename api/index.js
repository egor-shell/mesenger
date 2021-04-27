require('dotenv').config()
const express = require("express"),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    socketio = require('socket.io'),
    port = process.env.PORT || 5000,
    // sequelize = require('./db'),
    io = socketio(server)
    router = require('./router'),
    { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

// const start = async () => {
//     try {
//         await sequelize.authenticate()
//         await sequelize.sync()
//         io.on('connection', (socket) => {
//             console.log('New conncection')

//             socket.on('disconnect', () => {
//                 console.log('User disconnect')
//             })
//         })
//         app.use(router)
//         server.listen(port, () => console.log("Backend server live on " + port))
//     } catch (e) {
//         console.log(e)
//     }
// }
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        // if(error) return callback(error)

        socket.emit('message', { message: `${user.name}, welcome to the room - ${user.room}`, author: 'Bot'})
        socket.broadcast.to(user.room).emit('message', { message: `${user.name}, has joined`, author: 'Bot'})

        socket.join(user.room)

        // callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { message: message, author: user.name})

        // callback()
    })

    socket.on('disconnect', () => {
        console.log('User disconnect')
    })
})
app.use(router)
server.listen(port, (err) => {
    if(err) {
        throw Error(err)
    }
    console.log("Backend server live on " + port)
})