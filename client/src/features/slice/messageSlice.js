import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    chats: [
        {
            name: 'John',
            messages: []
        },
        {
            name: 'Alex',
            messages: []
        },
        {
            name: 'Andrew',
            messages: []
        }
    ],
    chatId: -1,
    // messageInChat: []
  },
  reducers: {
    getChatId(state, action) {
      state.chatId = Number(action.payload)
    },
    sender: (state, action) => {
        state.messages.push(action.payload);
    },
    toChat: (state, action) => {
      state.chats[state.chatId].messages.push(action.payload)
    },
    // messageFilter: (state) => {
    //   // action.payload = state.messages.filter((item, id) => state.chats[state.chatId].messages.includes(id))
    //   // state.messages.filter((item) => item == {})
    //   const messages = state.messages
    //   const chats = state.chats
    //   const chatId = state.chatId
    //   // state.messageInChat = messages.filter((item, id) => chats[chatId].messages.includes(id))
    //   state.messageInChat = messages.filter((item, id) => chats[chatId].messages.includes(id))
    // },
  },
  
});

export const { getChatId, sender, toChat } = chatSlice.actions;

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectMessages = state => state.chat.messages
export const selectChat = state => state.chat.chats
export const selectChatId = state => state.chat.chatId
// export const selectMessageInChat = state => state.chat.messageInChat

export default chatSlice.reducer;
