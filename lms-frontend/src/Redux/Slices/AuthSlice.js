import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from '../../Helpers/axiosInstance'

const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role') || "",
    data : localStorage.getItem('data') || {}

}

// Thunks , reducers ache se padho !!!!

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
        // Upar await karte the toh toast aane mai bhi time lagta tha issliye response ke time par await kar rha hu
        return (await res).data;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("/auth/logout" , async () => {
    try{
        const response = axiosInstance.post("user/logout");
        toast.promise(res , {
            loading : "Wait , Logout your account" , 
            // Success ho gya toh joh bhi data aayega promise mai ham woh dikhayenge
            success : (data) => {
                return data?.data?.message;
            },
            error :  "Failed to Logout"
    });
}
    catch(error){
        toast.error(error?.response?.data?.message)
    }
})

// Server ka main address (base)

// Yeh ek action hi hai.
export const login = createAsyncThunk("/auth/login" , async (data) => {
    try{

        // Serverse pe request mar rhe hai , server se hi response ke payload wagera set karenge
        const response = axiosInstance.post("user/login" , data);
        toast.promise(res , {
            loading : "Wait , Authenticating your account" , 
            // Success ho gya toh joh bhi data aayega promise mai ham woh dikhayenge
            success : (data) => {
                return data?.data?.message;
            },
            error :  "Failed to Login"
        });
        // Response ka data
        return (await res).data;
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
    // Thunk op!!
    extraReducers : (builder) => {

        // login ki fulfiled state pe ham ek reducer object define kar rha hai (login ko localstorage mai store karne ke liye)
        // Additional case reducer
        // Sab set kar rhe hai.
        builder.addCase(login.fulfilled , (state , action) => {
            localStorage.setItem("data" , JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn" , true);
            localStorage.setItem("role" , action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled , (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false,
            state.role = "";
        })
    }
})

// Abhi kuch actions hai hi nhi issliye export nhi kar payenge
// export const {} = authSlice.actions;
export default authSlice.reducer;

