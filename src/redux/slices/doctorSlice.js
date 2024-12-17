import { createSlice } from "@reduxjs/toolkit"
import { fetchDoctor, updateDoctor, deleteDoctor } from "../thunks/doctorThunks"


const updateLocalStorageDataField = (updatedData) => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));

    if (storedProfile) {
        const updatedProfile = {
            ...storedProfile,
            data: updatedData, 
        }
        localStorage.setItem('profile', JSON.stringify(updatedProfile));
    } else {
        console.error('No profile data found in localStorage.');
    }
}


const addAsyncThunkCases = (builder, asyncThunk, stateKey, options = {}) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.doctorLoading = true
            state.doctorError = null

        })
        .addCase(asyncThunk.fulfilled, (state, action) => { 
            state.doctorLoading = false
            state.doctorError = null

            switch (stateKey) {
                case "updateDoctor":
                    updateLocalStorageDataField({...action?.payload?.data})
                    break
                case "deleteDoctor": 
                    localStorage.clear()
                default:
                    break
            }


        })
        .addCase(asyncThunk.rejected, (state, action) => {
            state.doctorLoading = false
            state.doctorError = action?.payload || 'Something went wrong'         

        })
}

const initialState = {
    doctorLoading: false,
    doctorError: '', 
}


const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        addAsyncThunkCases(builder, updateDoctor, "updateDoctor")
        addAsyncThunkCases(builder, fetchDoctor, "fetchDoctor")
        addAsyncThunkCases(builder, deleteDoctor, "deleteDoctor")

    }
})



export const doctorThunks = doctorSlice.actions
export default doctorSlice.reducer