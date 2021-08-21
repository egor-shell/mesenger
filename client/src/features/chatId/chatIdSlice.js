const { createSlice } = require("@reduxjs/toolkit")

const chatIdSlice = createSlice({
    name: 'chatId',
    initialState: {
        chatId: -1
    },
    reducers: {
        newChatId: (state, action) => {
            state.chatId = action.payload
        },
        clearChatId: (state) => {
            state.chatId = -1
        }
    }
})

export default chatIdSlice.reducer
export const { newChatId, clearChatId } = chatIdSlice.actions

export const selectChatId = state => state.chatId.chatId