import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from '../../Helpers/axiosInstance'

const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role') || "",
    data : localStorage.getItem('data') || {}

}

// Asynchronous thunk (react.dev)
// Thunk -> concept hai joh use hota hai jab function primailary used to delay the calculation of any operation (Delayed Worked)
// createAsyncThunk -> react toolkit (promise based syntax , jab yeh promise ke resolve hone ke baad execute hoga )
export const createAccount = createAsyncThunk("/auth/signup" , async (data) => {
    try{

        // Serverse pe request mar rhe hai , server se hi response ke payload wagera set karenge
        const response = axiosInstance.post("user/register" , data);
        toast.promise(res , {
            loading : "Wait , creating your account" , 
            // Success ho gya toh joh bhi data aayega promise mai ham woh dikhayenge
            success : (data) => {
                return data?.data?.message;
            },
            error :  "Failed to create account"
        });
        // Response ka data
        return res.data;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

// Key value Op !!!
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {},
})

// Abhi kuch actions hai hi nhi issliye export nhi kar payenge
// export const {} = authSlice.actions;
export default authSlice.reducer;

