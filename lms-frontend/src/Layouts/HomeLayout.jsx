
// Daisy ui pluggin op
// Drawwer component (side bar component)
// making hamburger 
// Feather (fi) , AntDesign (ai)
import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Slices/AuthSlice';

// text-base-content (font-size 1 rem and line-height)
function HomeLayout({children}){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // For checking if user is logged in or not

    // auth slice main hamne select karke rkha tha
    const isLoggedIn = useSelector((state) => state ?.auth ?. isLoggedIn);

    // For displaying the options
    // State mai se lekar aayenge
    const role = useSelector((state) => state ?.auth ?. role);


    // Changing the width (jaha par actual content hota hai usko hi toggle kar rhe hia)
    function changeWidth(){
        const drawerSide = document.getElementsByClassName('drawer-side');

        // Auto kar diye toh yeh w-fit ki tarah kaam karega
        drawerSide[0].style.width = 'auto';
    }

    // For Toggling
    function hideDrawer(){
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        // Abb drawer-side ki width ko 0 kar denge
        const drawerSide = document.getElementsByClassName('drawer-side');

        // Auto kar diye toh yeh w-fit ki tarah kaam karega
        drawerSide[0].style.width = '0px';
    }

    async function handleLogout(e){
        e.preventDefault();
        // Auth slice se milega
        // Jab reducers banenge tab yaha par hoga 
        const res = await dispatch(logout());
        // Waha bhej rhe hai
        if(res?.payload?.success)
        navigate("/");
    }

    return(
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                      <FiMenu 
                        onClick={changeWidth}
                        size={"32px"}
                        className="font-bold text-white m-4"
                      />  
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className='drawer-overlay'>
                    </label>
                    <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle
                                
                                size={24}
                                />
                            </button>
                        </li>
                        <li>
                            <Link to="/"  > 
                            Home
                            </Link>
                        </li>

                        {isLoggedIn && role === 'ADMIN' && (
                          <li>
                            <Link to='/admin/dashboard'>Admin Dashboard</Link>
                          </li>  
                        ) }

                        <li>
                            <Link to="/courses"  > 
                            All Courses
                            </Link>
                        </li>

                        <li>
                            <Link to="/contact"  > 
                            Contact Us
                            </Link>
                        </li>

                        <li>
                            <Link to="/about"  > 
                            About Us
                            </Link>
                        </li>

                        {!isLoggedIn && (
                            <li className="relative">
                            <div className="w-full flex items-center justify-center">
                                <button className='btn btn-primary px-6 py-1 font-semibold rounded-md w-fit'>
                                    <Link to='/login'>Login</Link>
                                </button>
                                <button className='btn btn-secondary px-6 py-1 font-semibold rounded-md w-fit'>
                                    <Link to='/signup'>Signup</Link>
                                </button>
                            </div>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li className="relative">
                            <div className="w-full flex items-center justify-center">
                                <button className='btn-primary px-6 py-1 font-semibold rounded-md w-full'>
                                    <Link to='/user/profile'>Profile</Link>
                                </button>
                                <button className='btn-secondary px-6 py-1 font-semibold rounded-md w-full'>
                                    <Link onClick={handleLogout}>Logout</Link>
                                </button>
                            </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Rendering all the children props */}

            {children}

            <Footer/>
        </div>
    )
}
export default HomeLayout;