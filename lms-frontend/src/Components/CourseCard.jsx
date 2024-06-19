import { useNavigate } from "react-router-dom";

function CourseCard({data}){
    const navigate = useNavigate();


    return (
        <div
        // Navigate op (react router dom navigate method state property).
        // UseLocation Op
        // UseLocation with useNavigate
         onClick={() => navigate("/course/description" , {state : {...data}})}
         className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700">

            <div className="overflow-hidden">
                <img src={data?.thumbnail?.secure_url} alt="Course Thumbnail" className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale-[1,2] transition-all ease-in-out duration-300" />

                <div className="p-3 space-y-1 text-white">
                    <h2 className="text-xl font-bold text-yellow-500 line-clamp">
                        {data?.title}
                    </h2>
                    <p className="line-clamp">
                        {
                            data?.description
                        }
                    </p>
                    <p className="fonr-semibold">
                            <span className="text-yellow-500 font-bold">Category : </span>
                            {
                            data?.category
                            }
                    </p>

                    <p className="fonr-semibold">
                            <span className="text-yellow-500 font-bold">Total Lectures : </span>
                            {
                            data?.numberOfLecture
                            }
                    </p>
                </div>
            </div>
        </div>
    )
}
export default CourseCard;