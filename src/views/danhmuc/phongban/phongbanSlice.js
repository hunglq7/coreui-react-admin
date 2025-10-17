import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    data: [],
}
export const phongbanSlice = createSlice({
    name: 'listPhongban',
    initialState,
    reducers: {
        listPhongban: (state, action) => {
            state.data = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { listPhongban } = phongbanSlice.actions
export default phongbanSlice.reducer