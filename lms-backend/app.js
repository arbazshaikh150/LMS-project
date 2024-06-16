// Common js mai require , ham import export karenge (type : module)
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
const app = express();
// {} matlab named export , bina uske means default exports
import userRoutes from './routes/userRoutes.js'
import errorMiddleware from './middlewares/error.middleware.js';
import courseRoute from './routes/course.routes.js'
import paymentRoute from './routes/payment.routes.js'
// joh bhi request mai body aati hai woh parse hokar chale jaye
app.use(express.json());

// Middleware 
// Encoded url mai se query param nikalne mai aasani hoti hai
app.use(express.urlencoded({extended : true}))

app.use(cors({
    origin : [process.env.FRONTEND_URL],
    credentials : true
}));

// For parsing the jwt tokens , app mai.
app.use(cookieParser());

// Dev level ke joh bhi hoga woh console par print karna
// user kuch bhi kar rha tha hame pata nhi chal rha tha
// Abb console par print hoga , ky kar rha hia
// Console.log se bhi kar sakte hia

// Logger middleware of nodejs
app.use(morgan('dev'));

// Yeh route par koi aaya toh hame pong send kar denge , just for checking that our server is up or not?
app.use('/ping' , function(req , res){
    res.send('Pong');
});



// 3 modules rooutes
app.use('/api/vi/user' , userRoutes);


//  For course related routes
app.use('/api/v1/courses' , courseRoute)


//  Adding Payment Path
app.use('/api/v1/payments' , paymentRoute)


// other than all routes
app.use('*' , (req , res) => {
    res.status(404).send('OOPS !! , 404 page not found')
} )


// Koi bhi error aayi woh error waha capture ho jayegi aur ham user ko send kar denge

// Agar yaha tak pohche toh means error aaya hi hai
app.use(errorMiddleware);


export default app;