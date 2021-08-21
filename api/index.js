const { Chats } = require('./models/chat')

require('dotenv').config()
const express = require("express"),
    {graphqlHTTP} = require('express-graphql'),
    schema = require('./schema/usersSchema'),
    { user } = require('./controllers/users') 
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server, {
        cors: {
            origin: "*",
        }
    }),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    registerMessageHandlers = require('./handlers/messageHandlers'),
    registerUserHandlers = require('./handlers/userHandlers'),
    authRouter = require('./Routers/authRoute'),
    router = require('./router'),
    { Users } = require('./models/user')
    PORT = process.env.PORT || 5000,
    log = console.log

Users.init()
Chats.init()

app.use(cors())
app.options('*', cors())

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: new user
}))
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