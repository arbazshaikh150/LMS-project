### Course Explore
``` Learning Management System ```
### Payment Related bhi kar sakte hai.
Student -> user , course , payment
Admin -> User , courses , payment (management and creation)


### Backend Begins !!
Admin user or student can be easily managed used authentication and authorization
We have to use third party api for our email (Send), payment (RazorPay , etc);

### Dependencies
```
    npm i bcryptjs cloudinary cookie-parser cors dotenv express jsonwebtoken mongoose multer nodemailer nodemon morgan --save
```

Check this using POSTMAN!!

Client --> (Binary Data) --> Server (Binary to image convertion (multer package)) --> External common cdn par store karte hai (3rd party services). (Cloudinary)


```
    Postman --> Post --> FormData --> Avatar( client ka path )
```

### Forgot Password
Email --> url(token + expiry) --> sent to your email and after hitting that url.

Part 1:
a) Email --> Validate in database -> Generate new token -> send email with new url containing token + save token with expiry in database

Part 2:
Verify the token in database , (url query param) --> update password in database (sab encrypt karke karenge.)