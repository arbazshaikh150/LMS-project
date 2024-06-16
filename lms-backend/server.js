import {config} from 'dotenv';
// Config ko up karna hota hai , ab yeh .env ke andar files ko consider karta hai 
config();
// Proper .js dekar karna hai !!
import app from './app.js';
import connectionToDB from './config/dbConnection.js';
import cloudinary from 'cloudinary'
// Server mai app chala rha hai
import Razorpay from 'razorpay'

export const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID || 1,
    key_secret :process.env.RAZORPAY_SECRET_ID || 'SECRET', 
});

const PORT = process.env.PORT || 5000;
// First create account of cloudinary then hame milta hai 
app.listen(PORT , async () => {
    // Dabatase connection kar rhe hai
    await connectionToDB();
    console.log("App is running at port" , PORT);
})