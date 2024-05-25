import {useNavigate} from 'react-router-dom'
// H-screen tailwind properties (100vh height)

// Url unknown to our app

// Tracking widest(letter spacing) aesthetic

// Group , border current
function NotFound(){
    const navigate = useNavigate();
    // navigate(-1) -> 1 step piche
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <button className="mt-5">
                <a className="relative  inline-block text-sm medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
                    <span onClick={() => navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border border-current" >
                       Go Back 
                        </span>   
                </a>
                
            </button>
        </div>
    )
}
export default NotFound;