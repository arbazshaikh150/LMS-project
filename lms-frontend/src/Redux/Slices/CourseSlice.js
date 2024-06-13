//  Slice mai hi uske api interaction aur usmai ham ky state store karne walee hai hoti hai
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../Helpers/axiosInstance'
const initialState = {
    courseData : []
}


// Thunk
export const getAllCourses = createAsyncThunk("/course/get" , async () => {
    try{
        const response = axiosInstance.get("/courses");

        toast.promise(response , {
            loading : "Loading Course Data",
            success : "SuccessFully",
            error : "Failed"
        })


        // Ham yaha se array hi return kar rhe hai , builder mai action main mil jayega!!!
        return ((await response).data.courses);
    }
    catch{
        toast.error(e?.response?.data?.message);
    }
})

const courseSlice = createSlice({
    name : "Courses",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getAllCourses.fulfilled , (state , action) => {
            if(action.payload){
                state.courseData = [...action.payload]
            }
        })
    } 
})

export default courseSlice.reducer;