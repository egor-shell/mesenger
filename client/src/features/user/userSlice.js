const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    username: '',
    name: '',
    surname: '',
    id: -1
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDbUsername: (state, action) => {
            state.username = action.payload
        },
        setDbName: (state, action) => {
            console.log(action.payload)
            state.name = action.payload
        },
        setDbSurname: (state, action) => {
            state.surname = action.payload
        },
        setDbId: (state, action) => {
            state.id = action.payload
        },
        reset: () => {
            initialState
        }
    }
})

export default userSlice.reducer
export const { setDbUsername, setDbName, setDbSurname, setDbId,  reset} = userSlice.actions

export const selectId = state => state.user.id
export const selectUsername = state => state.user.username
export const selectName = state => state.user.name
export const selectSurname = state => state.user.surname