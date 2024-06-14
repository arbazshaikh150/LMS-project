import Course from "../models/course.model.js"
import AppError from "../utils/error.utils.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'



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

//  Lectures jabhi dekhunga jab mai logged in hu

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

const createCourse = async (req , res , next) => {
    //  Implementation
    //  Request mai details aa jayegi .. Frontend ban gya h btw

    // Posting FormData qki ham images bhi bhej rhe hai..
    // Upload middleware ky karega iss formdata ko request ke andar daal ke send kar dega

    const {title , description , category , createdBy} = req.body;

    if(!title || !description || !category || !createdBy){
        return next(
            new AppError('All Fields are required' , 400)
        );
    }

    //  Creating the instance of the above data
    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
    });

    if(!course){
        return next(
            new AppError('course Could not created' , 500)
        );
    }

    //  Saving it in the cloudinary
    if(req.file){
        try{
            //  Save Done
            const result = await cloudinary.v2.uploader.upload(req.file.path , {
                // Aur bhi add kar sakte hai
                folder : 'lms'
            });

            if(result){
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }

            // Removing file from local
            fs.rm(`uploads/${req.file.filename}`);
        }
        catch(e){
            return next(
                new AppError(e.message , 400)
            );
        }


    }
    // Save the course
    await course.save();

    res.status(200).json({
        success : true,
        message : 'Success Ho gya',
        course,
    });

}
const updateCourse = async (req , res , next) => {
    // Koi hame id bata de
    try{
        const {id} = req.params;

        // Abb hame usse update karna hai 
        //  Ham post bhi kar rhe hai ham waha se bhi id send kar sakte hai

        // MongoDb Op
        // Learn More about MondoDb
        const course = await Course.findByIdAndUpdate(
            id , 
            // OverWriting the value (joh bhi req.body mai ho)
            {
                $set : req.body,
            },
            // Mongo ke structure mai hai ya nhi dekhta hai
            {
                runValidators : true
            }
        )

        if(!course){
            return next(
                new AppError('Course with given id doesnot exist' , 400)
            );
        }
        res.status(200).json({
            success : true,
            message : 'Course Updated successfully',
            course
        });
    }
    catch(e){
        return next(
            new AppError(e.message , 400)
        );
    }
}
const removeCourse = async (req , res , next) => {
    //  Removing the course
    try{
        const {id} = req.params;
        // Searching in db
        const course = await Course.findById(id);

        if(!course){
            return next(
                new AppError('Course with given id doesnot exist' , 400)
            );
        }
        // Deleting the course
        await Course.findByIdAndDelete(id);


        res.status(200).json({
            success : true,
            message : 'Course Deleted successfully',
        });
    }
    catch(e){
        return next(
            new AppError(e.message , 400)
        ); 
    }
}

const addLectureByPostId = async(req , res , next) => {
    try{
    // Adding Lectures in our courses!!!!
    // Title , description and videos
    const {title , description } = req.body;
    const {id} = req.params;
    // Do validation

    const course = await Course.findById(id);
    if(!course){
        return next(
            new AppError('Course Does not exit' , 400)
        ); 
    }

    const lectureData = {
        title ,
        description,
        lecture : {

        },
    }

    if(req.file){
        // Cloudinary
        try{
            //  Save Done
            const result = await cloudinary.v2.uploader.upload(req.file.path , {
                // Aur bhi add kar sakte hai
                folder : 'lms'
            });

            if(result){
                // We can add the mp4 File also!!!!
                lectureData.lecture.public_id = result.public_id;
                lectureData.lecture.secure_url = result.secure_url;
            }

            // Removing file from local
            fs.rm(`uploads/${req.file.filename}`);
        }
        catch(e){
            return next(
                new AppError(e.message , 400)
            );
        }
        // Course mai lecture bhi hai na usse push kar rhe hai
        course.lectures.push(lectureData);

        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success : true,
            message : 'Lecturee is successfuly added',
            course
        });

    }
    }catch(e){
        return next(
            new AppError(e.message , 400)
        );
    }
}

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureByPostId
}