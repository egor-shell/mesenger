import {gql} from '@apollo/client'

export const LOGIN_USER = gql`
    mutation login($input: loginUserInput) {
        login(input: $input) {
            token
        }
    }
`

export const REGISTRATION_USER = gql`
    mutation registration($input: registerUserInput) {
        registration(input: $input) {
            token
        }
    }
`

export const ADD_CHAT = gql`
    mutation addChat($input: MessageInput) {
        addChat(input: $input) {
            username
        }
    }
`