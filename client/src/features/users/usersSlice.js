const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    users: []
}

const usersSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        setDbUsers: (state, action) => {
            console.log(action.payload)
            state.users = action.payload
        }
    }
})

export default usersSlice.reducer
export const { setDbUsers} = usersSlice.actions

export const selectUsers = state => state.usersList.users