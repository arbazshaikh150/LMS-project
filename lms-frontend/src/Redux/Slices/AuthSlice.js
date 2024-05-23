import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role : localStorage.getItem('role') || "",
    data : localStorage.getItem('data') || {}

}


// Key value Op !!!
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {},
})

// Abhi kuch actions hai hi nhi issliye export nhi kar payenge
// export const {} = authSlice.actions;
export default authSlice.reducer;

