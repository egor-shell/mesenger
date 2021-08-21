const { createSlice } = require("@reduxjs/toolkit")

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: []
    },
    reducers: {
        pushing: (state, action) => {
            state.messages.push(action.payload) 
        },
        cleaning: (state) => {
            state.messages = []
        }
    }
})

export default messageSlice.reducer
export const { pushing, cleaning } = messageSlice.actions

export const selectMessagePack = state => state.messages.messages