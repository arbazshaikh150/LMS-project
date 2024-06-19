import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail } from "../Helpers/regexMatcher";
import axios from "axios";

function Contact(){
    const [userInput , setUserInput] = useState({
        name : "",
        email : '',
        message : "",
    })

    function handleInputChange(e){
        // Hame pata nhi hai konsa kab change ho rha hai , issliye yeh generic method hai
        // Name mai aa jayega joh hamne attribute diya tha
        const {name , value} = e.target;

        console.log(name , value);
        setUserInput({
            ...useState ,
            [name] : value
        })
    }


    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message){
            toast.error('All Fields are Mandatory')
            return;
        }
        if(!isEmail(userInput.email)){
            toast.error('Invalid Email');
            return;
        }

        // Api call
        try{
            const response = axios.post('/contact' , userInput)

            // Promise Op
            toast.promise(response , {
                loading : 'Submitting...',
                success : 'Submitted SuccessFully',
                error : 'Failed To submit',
            })
            const contactResponse = await response;
            if(contactResponse?.data?.success){
                setUserInput({
                    name : "",
                    email : '',
                    message : "",
                })
            }
        }
        catch(e){
            toast.error('Operation Failed');
        }
    }


    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form 
                onSubmit={onFormSubmit} 
                noValidate className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10ox_black] w-[22rem]">

                    <h1 className="text-3xl font-semibold">
                        Contact Form
                    </h1>
                    
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">
                            Name
                        </label>
                        <input 
                        value={userInput.name}
                        className="bg-transparent border px-2 py-1 rounded-sm"
                        id="name" type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-xl font-semibold">
                            Email
                        </label>
                        <input
                        value={userInput.email} 
                        className="bg-transparent border px-2 py-1 rounded-sm"
                        id="email" type="email"
                        name="email"
                        placeholder="Enter Your email" 
                        onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-xl font-semibold">
                            Message
                        </label>
                        <textarea
                        value={userInput.message} 
                        className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                        id="message"
                        name="message"
                        placeholder="Enter Your message"
                        onChange={handleInputChange} 
                        />
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 hoer:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2fonr-semibold text-lg cursor-pointer">
                        Submit
                    </button>
                    

                </form>
            </div>
        </HomeLayout>
    )
}
export default Contact;