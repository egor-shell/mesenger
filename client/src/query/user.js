import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            id, username, chats {
              usersId, chatId
            }
        }
    }
`
export const GET_USER = gql`
    query getUser($id: ID){
        getUser(id: $id) {
            username
        }
    }
`

export const GET_CHAT = gql`
    query getChat($usersId: [Int]) {
        getChat(usersId: $usersId) {
            usersId, messages {
                userId
            }
        }
    }
`