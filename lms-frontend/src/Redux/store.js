import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import CourseSliceReducer from './Slices/CourseSlice';

// Configuring the redux 
// Ek reducer bhi bann gya hai!!
const store = configureStore({
    reducer: {
        auth : authSliceReducer,
        course : CourseSliceReducer
    },
    devTools : true
})

export default store;