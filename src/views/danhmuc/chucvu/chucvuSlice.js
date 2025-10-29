import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../Utils/Api'
// const initialState = {
//     data: [],
// }
// export const chucvuSlice = createSlice({
//     name: 'listChucvu',
//     initialState,
//     reducers: {
//         listChucvu: (state, action) => {
//             state.data = action.payload
//         },
//     },
// })

// const baseURL = `${import.meta.env.VITE_URL}/api`
const initialState = {
    data: [],
    loadding: false,
    error: null
}
export const readAllChucvu = createAsyncThunk(
    "readAllChucvu",
    async (args, { rejectWithValue }) => {
        try {
            const response = await api.get('Chucvu');
            return response.data;
        } // Returning only the data
        catch (error) {
            return rejectWithValue(error)
        }

    }
)


// Action creators are generated for each case reducer function
// export const { listChucvu } = chucvuSlice.actions
// export default chucvuSlice.reducer

const chucvuSlice = createSlice({
    name: 'chucvuSlice',
    initialState,
    reducers: {
        // ListDonvitinh: (state, action) => {
        //     state.data = action.payload
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(readAllChucvu.pending, (state) => {
                state.loadding = true
            })
            .addCase(readAllChucvu.fulfilled, (state, action) => {
                //action.payload dữ liệu gọi đến reducer để cập nhât state
                //cụ thể acion.payload lúc này là Donvitinh mới được tạo do api trả về
                state.loadding = false
                state.data = action.payload
            })
            .addCase(readAllChucvu.rejected, (state, acion) => {
                state.loadding = false
                state.error = acion.payload
            })
    }
})

export const { ListChucvu } = chucvuSlice.actions
export default chucvuSlice.reducer