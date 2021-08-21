const {buildSchema} = require('graphql')

const schema = buildSchema(`

    type User {
        id: ID
        username: String
        password: String
        email: String
        name: String
        surname: String
        online: Boolean
        socketId: String
        chats: [Chat]
        token: String
    }

    type Chat {
        usersId: [Int]
        chatId: String
        messagesLength: Int
    }

    type ChatWithMessage {
        chatId: String
        messages:[Message]
        usersId: [Int]
    }

    type Message {
        messageText: String
        senderName: String
        userId: Int
        messageId: String
    }

    input registerUserInput {
        id: ID
        username: String!
        password: String!
        email: String!
        name: String!
        surname: String!
        online: Boolean
        socketId: String
        chats: [ChatInput]
    }

    input loginUserInput {
        username: String!
        password: String!
    }

    input ChatInput {
        usersId: [Int]
        chatId: String
        messagesLength: Int
    }

    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
        getChat(usersId: [Int]): ChatWithMessage
    }

    type Mutation {
        registration(input: registerUserInput): User
        login(input: loginUserInput): User
    }
`)

module.exports = schema