import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'

// Configuring the redux 
// Ek reducer bhi bann gya hai!!
const store = configureStore({
    reducers: {
        auth : authSliceReducer,
    },
    devTools : true
})

export default store;