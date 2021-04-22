import { createSlice } from '@reduxjs/toolkit';

export const chatIdSlice = createSlice({
    name: 'chatId',
    initialState: {
        chatId: -1
    },
    reducers: {
        getChatId(state, action) {
            state.chatId = Number(action.payload)
        },
    },
})

export const { getChatId } = chatIdSlice.actions

export default chatIdSlice.reducer;