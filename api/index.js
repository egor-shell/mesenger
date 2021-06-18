require('dotenv').config()
const express = require("express"),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server, {
        cors: {
            origin: "*",
        }
    }),
    cors = require('cors'),
    registerMessageHandlers = require('./handlers/messageHandlers'),
    registerUserHandlers = require('./handlers/userHandlers'),
    authRouter = require('./Routers/authRoute'),
    router = require('./router'),
    { Users } = require('./models/user')
    PORT = process.env.PORT || 5000,
    log = console.log

Users.init()

app.use(cors())
app.options('*', cors())
app.use(express.json())

const onConnection = (socket) => {
    log(`User connected with id: ${socket.id}`)
    
    const { roomId } = socket.handshake.query
    
    socket.roomId = roomId

    socket.join(roomId)

    registerMessageHandlers(io, socket)
    registerUserHandlers(io, socket)

    socket.on('disconnect', () => {
        log('User disconnect')

        socket.leave(roomId)
    })
}

io.on('connection', onConnection)

app.use(router)
app.use('/api/v1/auth', authRouter)

server.listen(PORT, (err) => {
    if(err) {
        throw Error(err)
    }
    console.log("Backend server live on " + PORT)
})