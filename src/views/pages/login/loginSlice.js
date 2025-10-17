import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    data: [],
}
export const loginSlice = createSlice({
    name: 'listLogin',
    initialState,
    reducers: {

        listLogin: (state, action) => {
            state.data = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { listLogin } = loginSlice.actions
export default loginSlice.reducer