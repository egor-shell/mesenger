import { combineReducers, configureStore } from '@reduxjs/toolkit'
import isAuthSlice from './isAuth/isAuthSlice'
import userSlice from './user/userSlice'

const rootReducer = combineReducers({
    isAuth: isAuthSlice,
    user: userSlice
})

export const store = configureStore({
    reducer: rootReducer
})