import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    name: '',
    // room: '',
    rooms: {},
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
    chatId: -1
    // messageInChat: []
  },
  reducers: {
    getName(state, action) {
      state.name = action.payload
    },
    getRoom(state, action) {
      state.rooms = action.payload
    },
    getChatId(state, action) {
      state.chatId = Number(action.payload)
    },
    sender: (state, action) => {
        state.messages.push(action.payload);
    },
    toChat: (state, action) => {
      state.chats[state.chatId].messages.push(action.payload)
    },
    // createRoom: (state, action) => {
    //   state.room[action.payload] = { messages: []}
    // }
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

export const { getName, getRoom, getChatId, sender, toChat, createRoom } = chatSlice.actions;

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectName = state => state.chat.name
export const selectRooms = state => state.chat.rooms
export const selectMessages = state => state.chat.messages
export const selectChat = state => state.chat.chats
export const selectChatId = state => state.chat.chatId
// export const selectMessageInChat = state => state.chat.messageInChat

export default chatSlice.reducer;
