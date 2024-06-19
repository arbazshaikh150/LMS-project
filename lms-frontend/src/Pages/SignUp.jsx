import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";

// Bina kuch karke submit kar rha hu toh toast nhi aa rha hai , email khud validate karta hai usse hatane ke liye no-validate attribute use karna pada

// File reader object -->
// used to read the data of blob or file as a data url (base 64 token mai file ko read karne ki koshish karega)

// React Icons (profile wala)

// Tailwind shadow property [] custom shadow
// Shadow op!!


// Form data object in javascript(replicate the functionality of form element) , ham simple plain javascript onject bhi bana sakte hia iska alternative

function SignUp(){
    // Import --> ctrl + space (text pe le jaakar)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage , setPreviewImage] = useState("");
    // Avatar Image
    const [signupData , setSignupData] = useState({
        fullName : "",
        email : "",
        password : "",
        avatar : ""
    })

    // Yeh function mai event object milega , aur woh event ke target ko access karoge toh hame html element uska mil jayega (input mai attribute the hame pure inputs mil jayega)


    // Phle email aur password ke liye alag alag function likhne padte the (change kar rhe hai toh ) abb jab onchange hoga tab yeh function khud pura event le lega then usmai se hi handle kar lega , password change hia ya email

   function handleUserInput(e){
    // HTML ELEMENT KA ATTRIBUTES (VALUES)
        const {name , value} = e.target;
        setSignupData({
            ...signupData , 
            // Joh bhi name value aa rhi hai usmai set kar do
            [name] : value
        })
   }   
   
//    For image
   function getImage(event){
        event.preventDefault();
        const uploadedImage = event.target.files[0];

        if(uploadedImage){
            setSignupData({
                ...signupData ,
                avatar : uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load" , function () {
                setPreviewImage(this.result);
            })
        }
   }

// OnSubmit mai dena padega
   async function createNewAccount(event){
        // Form ka submission page ko refresh karne ka koshish karta , woh hame nhi karna hai
        event.preventDefault();
        // Hame toast chahiye 
        if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar){
            toast.error("Please Fill All the details")
            return;
        }

        // Checking name field length
        if(signupData.fullName.length < 5){
            toast.error("Name should be atleast of 5 Characters")
            return;
        }
        // Email ki regex validation javascript
        // Google op
        if(!isEmail(signupData.email)){
            toast.error("Invalid Email Id");
            return;
        }

        // Checking password validation
        if(!isValidPassword(signupData.password)){
            toast.error("Password should be 6 - 16 character long with atleast a number and special character");
            return;
        }

        // Form data bana rhe hai
        const formData = new FormData;
        formData.append("fullName" , signupData.fullName);
        formData.append("email" , signupData.email);
        formData.append("password" , signupData.password);
        formData.append("avatar" , signupData.avatar);

        // Dispatch create account action
        const response = await dispatch(createAccount(formData))



        // Agar action sahi se chla
        if(response?.payload?.success)
        navigate("/");
        setSignupData({
            fullName : "",
            email : "",
            password : "",
            avatar : ""
        });
        setPreviewImage("");

        
        
   }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form
                noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>

                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {/* User can upload image too */}
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto"
                            src={previewImage}/>
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                        )}
                    </label>
                    {/* Label pe click karenge toh bhi choose file ka option aa rha hai issliye hidden */}
                    {/* Allowed files --> accept */}
                    <input
                        onChange={getImage} 
                        className="hidden"
                        type="file"
                        id="image_uploads"
                        // Jab server pe jayega toh kiss parameter ke basis par jayega
                        name="image_uploads"
                        accept=".jpg , .jpeg , .png , .svg"
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">Name</label>
                        <input type="text"
                        required 
                        name="fullName"
                        id="fullName"
                        placeholder="Enter Your Name"
                        className="bg-transparent px-2 py-1 border "
                        onChange={handleUserInput}
                        value={signupData.fullName} 
                        />
                    </div>


                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input type="email"
                        required 
                        name="email"
                        id="email"
                        placeholder="Enter Your Email"
                        className="bg-transparent px-2 py-1 border " 
                        onChange={handleUserInput}
                        value={signupData.email}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input type="password"
                        required 
                        name="password"
                        id="password"
                        placeholder="Enter Your password"
                        className="bg-transparent px-2 py-1 border "
                        onChange={handleUserInput}
                        value={signupData.password} 
                        />
                    </div>
                    



                    <button 
                    type="submit" className=" mt-2 w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Create Account
                    </button>

                    <p className="text-center">
                        Already Have An Account ? <Link to="/login" className="link text-accent cursor-pointer">Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}
export default SignUp;