const { createSlice } = require("@reduxjs/toolkit")

const usersInChatSlice = createSlice({
    name: 'usersInChat',
    initialState: {
        usersInChat: null
    },
    reducers: {
        newUsersInChat: (state, action) => {
            state.usersInChat = action.payload
        },
        clearUsersInChat: (state) => {
            state.usersInChat = null
        }
    }
})

export default usersInChatSlice.reducer
export const { newUsersInChat, clearUsersInChat } = usersInChatSlice.actions

export const selectUsersInChat = state => state.usersInChat.usersInChat