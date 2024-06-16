import { Router } from "express";
import { allPayment, bySubscription, cancelSubscription, getRazorPayApiKey, verifySubscription } from "../controllers/payment.controller.js";
import { authorizedRole, isLoggedIn } from '../middlewares/auth.middleware.js';



const router = Router();
// Adding middle ware
router
    .route('/razorpay-key')

    .get(isLoggedIn ,
        getRazorPayApiKey);

router
    .route('/subscribe')
    .post(isLoggedIn , bySubscription);

router
    .route('/verify')
    .post(isLoggedIn , verifySubscription);

router
    .route('/unsubscribe')
    .post(isLoggedIn , cancelSubscription);

// List All the payment details
router
    .route('/')
    .get(isLoggedIn , authorizedRole('ADMIN') ,allPayment);

export default router;


