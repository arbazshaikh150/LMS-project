import {config} from 'dotenv';
// Config ko up karna hota hai , ab yeh .env ke andar files ko consider karta hai 
config();
// Proper .js dekar karna hai !!
import app from './app.js';
import connectionToDB from './config/dbConnection.js';

// Server mai app chala rha hai

const PORT = process.env.PORT || 5000
app.listen(PORT , async () => {
    // Dabatase connection kar rhe hai
    await connectionToDB();
    console.log("App is running at port" , PORT);
})