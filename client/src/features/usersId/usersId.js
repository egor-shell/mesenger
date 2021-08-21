const { createSlice } = require("@reduxjs/toolkit")

const usersIdSlice = createSlice({
    name: 'usersId',
    initialState: {
        usersId: null
    },
    reducers: {
        newUsersId: (state, action) => {
            state.usersId = action.payload
        },
        clearUsersId: (state) => {
            state.usersId = null
        }
    }
})

export default usersIdSlice.reducer
export const { newUsersId, clearUsersId } = usersIdSlice.actions

export const selectUsersId = state => state.usersId.usersId