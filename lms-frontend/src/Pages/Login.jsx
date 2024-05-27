import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'
import { login } from "../Redux/Slices/AuthSlice";

// Bina kuch karke submit kar rha hu toh toast nhi aa rha hai , email khud validate karta hai usse hatane ke liye no-validate attribute use karna pada

// File reader object -->
// used to read the data of blob or file as a data url (base 64 token mai file ko read karne ki koshish karega)

// React Icons (profile wala)

// Tailwind shadow property [] custom shadow
// Shadow op!!


// Form data object in javascript(replicate the functionality of form element) , ham simple plain javascript onject bhi bana sakte hia iska alternative

function Login(){
    // Import --> ctrl + space (text pe le jaakar)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData , setLoginData] = useState({
        email : "",
        password : "",
    })

    // Yeh function mai event object milega , aur woh event ke target ko access karoge toh hame html element uska mil jayega (input mai attribute the hame pure inputs mil jayega)


    // Phle email aur password ke liye alag alag function likhne padte the (change kar rhe hai toh ) abb jab onchange hoga tab yeh function khud pura event le lega then usmai se hi handle kar lega , password change hia ya email

   function handleUserInput(e){
    // HTML ELEMENT KA ATTRIBUTES (VALUES)
        const {name , value} = e.target;
        setLoginData({
            ...loginData , 
            // Joh bhi name value aa rhi hai usmai set kar do
            [name] : value
        })
   }   
   

// OnSubmit mai dena padega
   async function onLogin(event){
        // Form ka submission page ko refresh karne ka koshish karta , woh hame nhi karna hai
        event.preventDefault();
        // Hame toast chahiye 
        if(!loginData.email || !loginData.password ){
            toast.error("Please Fill All the details")
            return;
        }



    //    Using objects
        // Dispatch create account action
        const response = await dispatch(login(loginData))



        // Agar action sahi se chla
        if(response?.payload?.success)
        navigate("/");
        setLoginData({
            email : "",
            password : "",
        });

        
        
   }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form
                noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] ">
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input type="email"
                        required 
                        name="email"
                        id="email"
                        placeholder="Enter Your Email"
                        className="bg-transparent px-2 py-1 border " 
                        onChange={handleUserInput}
                        value={loginData.email}
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
                        value={loginData.password} 
                        />
                    </div>
                    



                    <button 
                    type="submit" className=" mt-2 w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Login Account
                    </button>

                    <p className="text-center">
                        Do Have An Account ? <Link to="/signup" className="link text-accent cursor-pointer">Signup</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}
export default Login;