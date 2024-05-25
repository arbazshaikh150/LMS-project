import CarouselSlide from "../Components/CarouselSlide"
import HomeLayout from "../Layouts/HomeLayout"
import { celebrities } from "../Constants/CelebrityData"
import aboutMainImage from "../assets/Images/aboutMainImage.png";

// Technically code repetation hai corousel main , we can make slide component and the array of objects (op logic !!!)

// More focus on clean code , can make constant Folder

function AboutUs(){
    

    return (
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">Affordable and Quality Education</h1>
                        <p className="text-xl text-grey-200">
                            Our Goal is to provide the afoordable and quality education to the world. We are providing the platform for the aspiring teacher and students to share their skills , creativity and knowledge to empower and contribute in the growth.
                        </p>
                    </section>

                    <div className="w-1/2">
                        {/* Added Images get from assest */}

                        <img 
                        id="test1"
                        style={{
                            filter:"drop-shadow(0px 10px 10px rgb(0 , 0 , 0));"
                        }}
                        className="drop-shadow-2xl" src={aboutMainImage} alt="" />
                    </div>
                </div>
                {/* Carousal */}
                {/* Copied from daisy ui carousel */}
                <div className="carousel w-1/2 my-16 m-auto">
                    {celebrities &&
                    celebrities.map(celebrity => <CarouselSlide {...celebrity} key={celebrity.slideNumber} totalSlides={celebrities.length

                    }/>)}


                    {/* <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-40 rounded-full border-2 border-gray-400" />
                        <p className="text-xl text-grey-200">
                            {"Education is the most powerful tool you can use to change the World"}
                        </p>
                        <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a> 
                        <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                        </div>
                    </div> 
                    <div id="slide2" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-40 rounded-full border-2 border-gray-400" />
                        <p className="text-xl text-grey-200">
                            {"Education is the most powerful tool you can use to change the World"}
                        </p>
                        <h3 className="text-2xl font-semibold">APJ Abdul Kalam</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a> 
                        <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                        </div>
                    </div> 
                    <div id="slide3" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-40 rounded-full border-2 border-gray-400" />
                        <p className="text-xl text-grey-200">
                            {"Education is the most powerful tool you can use to change the World"}
                        </p>
                        <h3 className="text-2xl font-semibold">Steve Jobs</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a> 
                        <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                        </div>
                    </div> 
                    <div id="slide4" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-40 rounded-full border-2 border-gray-400" />
                        <p className="text-xl text-grey-200">
                            {"Education is the most powerful tool you can use to change the World"}
                        </p>
                        <h3 className="text-2xl font-semibold">Bill Gates</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a> 
                        <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </HomeLayout>
    )
}
export default AboutUs