import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import { razorpay } from "../server.js";
import AppError from "../utils/error.utils.js";
import Crypto from 'crypto'

// TRY CATCH OP , Bhot important hai


export const getRazorPayApiKey = async (req , res , next) => {
    res.status(200).json({
        success : true,
        message : 'RazorPayApiKey',
        // Env mai hai op
        key : process.env.RAZORPAY_KEY_ID   
    })
}

export const bySubscription = async (req , res , next) => {
    const {id} = req.user;

    const user = await User.findById(id);

    // MiddleWare kar dega yeh but phir bhi ek baar cross check
    if(!user){
        return next(
            new AppError('Unauthorized User' , 400)
        );
    }

    if(user.role === 'ADMIN'){
        return next(
            new AppError(
                'Admin cannot purchase a subscription' ,
                400
            )
        );
    }

    // Creating the subscription on razorpay
    // Method to create the subscription
    const subscription = await razorpay.subscription.create({
        plan_id : process.env.RAZORPAY_PLAN_ID,
        customer_notify : 1
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
        success : true,
        message : 'Subscribed success',
        subscription_id : subscription.id

    })

}
export const verifySubscription = async (req , res , next) => {

    // Iske liye hame jwtMiddleWare lagana padega tbhi user ka details aayega
    // Payment hua hai ya nhi

    const {id} = req.user;
    const {razorpay_payment_id ,razorpay_subscription_id ,razorpay_signature} = req.body;

    // Razor Pay PostMan Collection bhi available hai
    // (We can read the documentation as well)
    const user = await User.findById(id);

    // MiddleWare kar dega yeh but phir bhi ek baar cross check
    if(!user){
        return next(
            new AppError('Unauthorized User' , 400)
        );
    }
    // Checking database mai aur ismai same hai ya nhi

    const subscriptionId = user.subscription.id;

    // Razor pay aise subscription id generate karta hai

    const generateSignature = Crypto.createHmac('sha256' , process.env.RAZORPAY_SECRET_KEY)
    .update(`${razorpay_payment_id} | ${subscriptionId}`)
    .digest('hex');

    if(generateSignature !== razorpay_signature){
        return next(
            new AppError('Nhi hua ' , 400)
        )
    }

    await Payment.create({
        razorpay_payment_id,
        razorpay_signature,
        razorpay_subscription_id
    });

    user.subscription.status = 'active';
    await user.save();

    res.status(200).json({
        success : true,
        message : 'Verified SuccessFully',
    })
    
}
export const cancelSubscription = async (req , res , next) => {
    // RazorPay NPM (SDK)
    const {id} = req.user;

    const user = await User.findById(id);

    // MiddleWare kar dega yeh but phir bhi ek baar cross check
    if(!user){
        return next(
            new AppError('Unauthorized User' , 400)
        );
    }

    if(user.role === 'ADMIN'){
        return next(
            new AppError(
                'Admin cannot purchase a subscription' ,
                400
            )
        );
    }

    const subscriptinId = user.subscription.id;

    // Cancel subscription
    const subscription = await razorpay.subscriptions.cancel(
        subscriptinId
    );

    // Setting status
    user.subscription.status = subscriptions.status;


    await user.save();
}
export const allPayment = async (req , res , next) => {
    // Kitna chahiye
    const {count} = req.query;
    // Fetching from razorpay
    // Razorpay se le rhe hai
    const subscriptions = await razorpay.subscriptions.all({
        count : count | 10,
    });

    const payments = 
    res.status(200).json({
        success : true,
        message : 'All Payment',
        subscriptions
    })
}

