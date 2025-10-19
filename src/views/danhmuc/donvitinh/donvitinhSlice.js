import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    data: [],
}
export const donvitinhSlice = createSlice({
    name: 'listDonvitinh',
    initialState,
    reducers: {

        listDonvitinh: (state, action) => {
            state.data = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { listDonvitinh } = donvitinhSlice.actions
export default donvitinhSlice.reducer