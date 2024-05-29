import mongoose from 'mongoose'
// mai strict mode mai run nhi karna chahta , means agar mene kuch galat data manga data base se toh error na de , usse ignore kar de
mongoose.set('strictQuery', false);

const connectionToDB = async () => {
    // Object return karta hai
    try{
        const {connection} = await mongoose.connect(
        // Konsa url hai
        process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms'
        )
        if(connection){
            console.log("Connection Done" , connection.host);
        }
    }
    catch(e){
        console.log(e);
        // Database hi nhi connect hai toh yahi band kar do
        process.exit(1);
    }
    
}

export default connectionToDB;