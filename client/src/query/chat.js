import { gql } from '@apollo/client'

export const GET_CHAT = gql`
    query getChat($usersId: [Int]) {
        getChat(usersId: $usersId) {
            messages
        }
    }
`