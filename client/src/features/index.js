import { combineReducers, configureStore } from '@reduxjs/toolkit'
import usersIdSlice from './usersId/usersId'
import isAuthSlice from './isAuth/isAuthSlice'
import messagesSlice from './messages/messagesSlice'
import chatIdSlice from './chatId/chatIdSlice'
import userSlice from './user/userSlice'
import usersInChat from './usersInChat/usersInChat'
import chatsSlice from './chats/chatsSlice'

const rootReducer = combineReducers({
    isAuth: isAuthSlice,
    user: userSlice,
    messages: messagesSlice,
    usersId: usersIdSlice,
    usersInChat: usersInChat,
    chatId: chatIdSlice,
    chats: chatsSlice
})

export const store = configureStore({
    reducer: rootReducer
})