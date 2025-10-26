import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    data: [],
}
export const chucvuSlice = createSlice({
    name: 'listChucvu',
    initialState,
    reducers: {
        listChucvu: (state, action) => {
            state.data = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { listChucvu } = chucvuSlice.actions
export default chucvuSlice.reducer