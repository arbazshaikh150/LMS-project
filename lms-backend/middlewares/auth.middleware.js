import AppError from "../utils/error.utils.js";
import jwt from 'jsonwebtoken'

const isLoggedIn = async (req , res , next) => {
    // App.js mai hamne cookie parser likha tha , abb joh bhi cookie aa rhi hai ham usmai se token extract kar sakte hai
    const {token} = req.cookies;

    if(!token){
        return next(new AppError('Unauthenticated , Login' , 401));
    }

    // Yeh token ki puri information mil gayi
    // Token , secret key
    const userDetails = await jwt.verify(token , process.env.JWT_SECRET);


    // Setting in the request body
    req.user = userDetails;
    next();
}

// Roles bata rha hai kon kon se user permited hai (ham hi batayenge function call ke time par)

//  Admin Op
const authorizedRole = (...roles) => async (req , res , next) => {
    // we already save req.user
    const currentUserRoles = req.user.role;
    //  Checking the role exist or not
    if(!roles.includes(currentUserRoles)){
        return next(new AppError('Not Permission Allowed' , 403));
    }

    next();
}

const authorizedSubscriber = async (req , res , next) => {
    const subscription = req.user.subscription;
    const currentUserRoles = req.user.role;

    if(currentUserRoles !== 'ADMIN' && subscription.status !== 'active'){
        return next(new AppError('Not Permission Allowed' , 403));
    }
    next();
}

export {
    isLoggedIn,
    authorizedRole,
    authorizedSubscriber
}