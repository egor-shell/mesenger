import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import chatIdSlice from '../features/slice/chatId';
import messageSlice from '../features/slice/messageSlice';

export default configureStore({
  devTools: true,
  reducer: {
    // counter: counterReducer,
    chat: messageSlice,
    chatId: chatIdSlice,
  },
});
