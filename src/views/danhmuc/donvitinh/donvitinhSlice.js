import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../Utils/Api'
import { donvitinhService } from '../../../service/donvitinhService';
const initialState = {
    data: [],
    loadding: false,
    error: null
}

export const createDonvitinh = createAsyncThunk(
    "createDonvitinh",
    async (data, { rejectWithValue }) => {
        console.log("createDonvitinh:", data)
        try {
            const response = await api.post(`Donvitinh`, data)
            return response
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const readAllDonvitinhs = createAsyncThunk(
    "readAllDonvitinhs",
    async (args, { rejectWithValue }) => {
        try {
            const response = await api.get('Donvitinh');
            return response.data;
        } // Returning only the data
        catch (error) {
            return rejectWithValue(error)
        }

    }
)

const donvitinhSlice = createSlice({
    name: 'donvitinhSlice',
    initialState,
    reducers: {
        // ListDonvitinh: (state, action) => {
        //     state.data = action.payload
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDonvitinh.pending, (state) => {
                state.loadding = true
            })
            .addCase(createDonvitinh.fulfilled, (state, action) => {
                //action.payload dữ liệu gọi đến reducer để cập nhât state
                //cụ thể acion.payload lúc này là Donvitinh mới được tạo do api trả về
                state.loadding = false
                state.data.put(action.payload)

            })
            .addCase(createDonvitinh.rejected, (state, acion) => {
                state.loadding = false
                state.error = acion.payload
            })
            .addCase(readAllDonvitinhs.pending, (state) => {
                state.loadding = true
            })
            .addCase(readAllDonvitinhs.fulfilled, (state, action) => {
                //action.payload dữ liệu gọi đến reducer để cập nhât state
                //cụ thể acion.payload lúc này là Donvitinh mới được tạo do api trả về
                state.loadding = false
                state.data = action.payload

            })
            .addCase(readAllDonvitinhs.rejected, (state, acion) => {
                state.loadding = false
                state.error = acion.payload
            })
    }
})

export const { ListDonvitinh } = donvitinhSlice.actions
export default donvitinhSlice.reducer