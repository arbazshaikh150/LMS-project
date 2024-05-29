import next from "next";
import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";

// Abhi cookie ka options
const cookieOptions = {
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
    secure : true
}

// Methods
const register = async (req , res , next) => {
    // Logic op
    const {fullName , email , password} = req.body;
    if(!fullName || !password || !email){
        // Res.status.json ko baar baar likhne se acha hamne ek utility class bana diye hia !
        // app -> userRoute mai error aaya yeh return kar gya abb waha ka next execute karo.(ham yaha middle ware bana denge)
        return next(new AppError("All Field are required" , 400));
    }
    const userExist = await User.findOne({email});

    if(userExist){
        // Koi user phle se exist karta h
        return next(new AppError("User Already exist" , 400));
    }
    // Creating new user
    // Making two steps process (saving in db) ,  1 -> profile ko cloudinary pe upload karenge then db mai save karenge
     const user = await User.create({
        fullName ,
        email,
        password,
        avatar : {
            public_id : email,
            // Cloudinary ka url
            secure_url : ''
        }
     })

     if(!user){
        return next(new AppError("User registration failed , please try again" , 400));
     }

    //  File upload

    // Done
    await user.save();
    //  Save karne ke baad usse undefined kar do qki mai woh nhi bhejna chahta hu
    user.password = undefined;

    // Abb register hogya hai toh usse directly login kara dete hai , hame jwt token chahiye then
    const token = await user.generateJWTToken();

    // Cookie mai set ho gya hai tokens
    res.cookie('token' , token , cookieOptions)

    // Token set ho gya hai

    res.status(201).json({
        success: true,
        message : "User register successfully",
        user,
    })
}

const login = async (req , res , next) => {
    try{
        const {email , password} = req.body;
        if(!password || !email){
            // Res.status.json ko baar baar likhne se acha hamne ek utility class bana diye hia !
            // app -> userRoute mai error aaya yeh return kar gya abb waha ka next execute karo.(ham yaha middle ware bana denge)
            return next(new AppError("All Field are required" , 400));
        }
        const user = await User.findOne({
            email
        }).select('+password')


        if(!user || !user.comparePassword(password)){
            return next(new AppError("Email or password doesn't match" , 400));
        }

        // Token generate karo do then
        const token = await user.generateJWTToken();
        user.password = undefined;

        // Key values op
        res.cookie('token' , token , cookieOptions);

        res.status(200).json({
            success : true,
            message : "User Logged In successfully",
            user,
        })
    }
    catch(e){
        return next(new AppError(e.message , 500));
    }

}

const logout = (req , res) => {
    // Cookie delete kar do means user logout ho gya
    res.cookie('token' , null , {
        secure : true ,
        maxAge : 0 , 
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : "User Logout successfully"
    })
}

const getProfile = async (req , res , next) => {
    // Konse user ki baat ho rhi hai
    try{
        // Bhai yeh user.id request mai kaha se aayi??
        // hamare pass token hai qki ham login hai
        // Woh token se information nikalke ham yeh request mai daal sakte hai
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({
            success : true,
            message : "User Details",
            user
        });
    }
    catch(e){
        return next(new AppError('Failed to fetched profile detail' , 500));
    }

}

export {register , login , logout , getProfile}