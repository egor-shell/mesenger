const { createSlice } = require("@reduxjs/toolkit")

const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        chats: null
    },
    reducers: {
        newChats: (state, action) => {
            state.chats = action.payload
        },
        clearChats: (state) => {
            state.chats = null
        }
    }
})

export default chatsSlice.reducer
export const { newChats, clearChats } = chatsSlice.actions

export const selectChats = state => state.chats.chats