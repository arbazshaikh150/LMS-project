import { Schema , model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

// Schema (Mast schema haii op)
const userSchema = new Schema({
    fullName : {
        type : 'String',
        required : [true , "Name is required"],
        minLength :  [5 , "Name Must be atleast 5 character"],
        maxLength :  [50 , "Name Must be less than 5 0character"],
        lowercase : true,
        trim : true
    },
    email : {
        type : 'String',
        required : true,
        lowercase : true,
        trim : true,
        unique : true,
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , "Please Fill the valid Email"],

    },
    password : {
        type : 'String',
        required : true,
        minLength : [8 , "passwod must be atleast 8 character"],
        // Explicitly maange tab hi dena
        select : false,
    },
    // Cloudinary op !!
    avatar : {
        public_id : {
            type: 'String'
        },
        secure_url : {
            type : 'String'
        }
    },
    role : {
        type : 'String',
        enum : ['USER' , 'ADMIN'],
        default : 'USER'
    },
    forgotPasswordToken : String,
    forgotPasswordExpiry : Date,

    // Baad main add kiye hia , for payment model
    subscription : {
        id : String,
        status : String
    }

}, {
    // By default hote rhe
    timestamps : true
});


// Encryption op
// Database mai encrypt karke hi store hogi !!
userSchema.pre('save' ,async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password , 10);
})

// Generic model
// Schema level par hi kar de rha hu
userSchema.methods = {
    generateJWTToken : async function(){
        // Steps to generate the jwt tokens
        return await jwt.sign({
            id : this._id,
            email : this.email,
            subscription : this.subscription,
            role : this.role
        } , 
        process.env.JWT_TOKEN,
        {
            expiresIn : process.env.JWT_EXPIRY,
        }
    )
    },
    comparePassword : async function (plainTextPassword){
        // Plain text ko database ke password se compare karna hai
        return await bcrypt.compare(plainTextPassword , this.password);
    },
    generatePasswordResetToken : async function (){
        // Token using crypto
        // Randomly taking the bits
        const resetToken = crypto.randomBytes(20).toString('hex')


        this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

        // 15 minute from now
        this.forgotPasswordExpiry = Date.now() + 15 * 60 *1000;
    },
}

// Fr forget password



// Model connection
const User = model("User" , userSchema);

// Export 
export default User;