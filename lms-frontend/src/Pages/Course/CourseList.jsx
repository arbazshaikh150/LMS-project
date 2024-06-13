import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getAllCourses } from '../../Redux/Slices/CourseSlice';
import HomeLayout from '../../Layouts/HomeLayout'
import CourseCard from '../../Components/CourseCard';
function CourseList(){
    const dispatch = useDispatch();
    
    // Course State le rhe hai
    const {courseData} = useSelector((state) => state?.course);
    async function loadCourse() {
        await dispatch(getAllCourses());
    }
    useEffect(() => {
        loadCourse();
    } , []);


    return (
        <HomeLayout>
            <div className='min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white'>
                <h1 className='text-center text-3xl font-semibold mb-5'>
                    Explore The Courses.
                    <span className="font-bold text-yellow-500">
                        Industry Expert
                    </span>
                </h1>
                    <div className="mb-10 flex flex-wrap gap-14">
                        {courseData?.map((e) => {
                            return <CourseCard key={e._id} data={e} />
                        })}
                    </div>
            </div>
        </HomeLayout>
    )
}
export default CourseList;