
// Bootstrap icons for our footer sections.
import {BsFacebook , BsInstagram , BsLinkedin , BsTwitter} from 'react-icons/bs';


// Npm install postcss autoprefixer as a dev dependencies , for seeing the tailwind changes (tailwind setup for vite project!)

function Footer(){
    // Fetching the current year
    const currentDate = new Date();
    const year = currentDate.getFullYear;

    return (
        <>
            {/* Using tailwind css */}
            {/* py-5 (tailwind ki apni unit(size chart based on rem)) */}
            <footer className='relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row  items-center justify-between text-white bg-gray-800 sm:px-20'>
            <section className='text-lg'>
                CopyRight {year} | All rights reserved
            </section>
            <section className='flex items-center justify-center gap-5 text-2xl text-white'>
                <a href="" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsFacebook/>
                </a>
                <a href="" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsInstagram/>
                </a>
                <a href="" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsLinkedin/>
                </a>
                <a href="" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                    <BsTwitter/>
                </a>
            </section>
            </footer>
        </>
    )
}
export default Footer;