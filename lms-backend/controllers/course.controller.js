import Course from "../models/course.model.js"
import AppError from "../utils/error.utils.js";

const getAllCourses = async (req , res , next) =>{
    //  Find Everything bas usmai se lectures ko chodh do (Sab kuch mil jayega !!)
    try{
        const courses = await Course.find({}).select('-lectures');

        //  Easy Op
        res.status(200).json({
            success : true,
            message : "All Courses You have !!",
            course : courses,
        })
    }
    catch(e){
        return next(
            new AppError(e.message , 500)
        );
    }

}

const getLecturesByCourseId = async (req , res , next) => {
    try{
        //  Taking from the params
        const {id} = req.params;


        const course = await Course.findById(id);

        if(!course){
            return next(
                new AppError('Invalid Course Id' , 400)
            );
        }

        res.status(200).json({
            success : true,
            message : 'SuccesFully Lecture Feetched',

            //  Sending the lectures
            //  From our schema
            lectures : course &&course?.lectures
        })
    }
    catch(e){
        return next(
            new AppError(e.message , 500)
        );
    }
}

export {
    getAllCourses,
    getLecturesByCourseId
}