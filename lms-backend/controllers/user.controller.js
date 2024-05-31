import next from "next";
import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";

import cloudinary from 'cloudinary'
// File system
import fs from 'fs/promises';

import crypto from 'crypto'
import sendEmail from "../utils/sendEmail.js";

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
            secure_url : 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
        }
     })

     if(!user){
        return next(new AppError("User registration failed , please try again" , 400));
     }

    //  File upload (Cloudinary)
    // Form data ki tarah bhej rha hu 
    // Form dara par binary dara bhi send kar sakte hai.. (inspect -> network)

    // We can make the middleware op  (Multer op) 
    // request mai middleware daal do , agar woh request form data ka ho , req.file mai mil jayegi abb

    if(req.file){
        // Uploading it into cloudinary(package for uploading or migrating the files)
        try{
            // Many customization and configuration , which can be learned using the documentation
            const result = await cloudinary.v2.uploader.upload(req.file.path , {
                folder : "lms",
                width : 250,
                height : 250,
                // Focus on face
                gravity : "faces",
                crop : 'fill',
            });

            if(result){
                user.avatar.public_id = result.public_id;

                user.avatar.secure_url = result.secure_url;

                // Set configuration of cloudinary

                // Remove file from local server
                fs.rm(`uploads/${req.file.filename}`);
            }
        }
        catch(e){
            return next(
                new AppError(e || 'file not uploaded' , 500)
            );
        }
    }


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


const forgotPassword = async (req , res , next) => {
    // Pen + paper -> then code
    const {email} = req.body;
    if(!email){
        return next(new AppError('Email is required' , 400)); 
    }
    const user = await User.findOne({email});
    if(!user){
        return next(new AppError('Email is not registered' , 400)); 
    }


    const resetToken = await user.generatePasswordResetToken();
    
    await user.save();
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`


    const subject = 'Reset Password';
    // Adding a href
    const message = `Reset password : ${resetPasswordUrl}`
    try {
        await sendEmail(email , subject , message);

        res.status(200).json({
            success : true ,
            message : "Reset Successfully"
        })
    }
    catch(e){
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;

        await user.save();

        return next(new AppError(e.message , 500));
    }
}

//  After sending it to gmail 
const resetPassword = async (req , res , next) => {
    // Data params mai aa rha hai
    // qki ham reset/token daal rhe the issliye param se le rhe hai
    // Postman se pata chal jayega
    // yeh crypto wala encrypted token tha
    const {resetToken} = req.params;

    const {password} = req.body;

    const forgotPasswordToken = crypto.createHash('sha256')
    .update(resetToken)
    .digest('hex');


    // Searching from database
    const user = await User.findOne({forgotPasswordToken , 
        forgotPasswordExpiry : {$gt : Date.now()}
    })

    if(!user){
        return next(
            new AppError('Token Expire / Invalid' , 400)
        );
    }


    // Encrypt wagera hamne pre mai phle se hi kar rkha hai
    user.password = password;


    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();
    res.send(200).json({
        success : true ,
        message : 'Password Change Succesfully'
    })
}


const changePassword = async (req , res , next) => {
    // Logic ko code mai likhne ka maza hi alag hai .. Mashallah


    const {oldPassword , newPassword} = req.body;

    const {id} = req.user;

    if(!oldPassword || !newPassword){
        return next(
            new AppError('All Fields Are Mandatory' , 400)
        );
    }

    const user = await User.findOne({id}).select('+password');

    if(!user){
        return next(
            new AppError('User doesnt exist' , 400)
        );
    }

    const isPasswordValid = await user.comparePassword(oldPassword);
    
    if(!isPasswordValid){
        return next(
            new AppError('Invalid Password' , 400)
        );
    }
    user.password = newPassword;
    user.password = undefined;
    await user.save();

    res.status(200).json({
        success : true ,
        message : 'Password Changed Successfully'
    })
}


const updateUser = async (req , res , next) => {
    const {fullName} = req.body;
    // Yeh verify bhi karega (ham token se nikal rhe hai)
    const {id} = req.user.id;

    const user = await User.findById(id);
    if(!user){
        return next(
            new AppError('User doesnt exist' , 400)
        );
    }

    if(req.fullName){
        user.fullName = fullName;
    }
    // Multer op
    if(req.file){
        // Delete from cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);


        try{
            // Many customization and configuration , which can be learned using the documentation
            const result = await cloudinary.v2.uploader.upload(req.file.path , {
                folder : "lms",
                width : 250,
                height : 250,
                // Focus on face
                gravity : "faces",
                crop : 'fill',
            });

            if(result){
                user.avatar.public_id = result.public_id;

                user.avatar.secure_url = result.secure_url;

                // Set configuration of cloudinary

                // Remove file from local server
                fs.rm(`uploads/${req.file.filename}`);
            }
        }
        catch(e){
            return next(
                new AppError(e || 'file not uploaded' , 500)
            );
        }
    }

    await user.save();
    res.status(200).json({
        success : true,
        message : "user details updated"
    })

}

export {register , login , logout , getProfile , forgotPassword , resetPassword , updateUser , changePassword}