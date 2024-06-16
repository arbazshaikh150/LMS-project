import {Router} from 'express';
import { addLectureByPostId, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from '../controllers/course.controller.js';
import { authorizedRole, authorizedSubscriber, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js'
// .js error !!! 
const router = new Router();



//  Playing with multiple middlewares op !!!!


//  Routes for the courses

// router.get('/' , getAllCourses);
//  Another method
router.route('/')
.get(getAllCourses)
.post(
    isLoggedIn,
    authorizedRole('ADMIN'),
    // Cloudinary Op , ek aur baar ache se padhna iske baare mai
    upload.single('thumbnail') ,
    createCourse);

// MiddleWare Op
//  Update ke liye mujhe id bhi chahiye hai na yaar

//  Creation and updation , deletion admin hi kar sakte hai
router.route('/:id')
.get( isLoggedIn , authorizedSubscriber ,getLecturesByCourseId)
.put(isLoggedIn ,
    // Ham multiple roles bhi send kar sakte hai!!
    authorizedRole('ADMIN'),
    updateCourse)
    .delete(isLoggedIn , 
        authorizedRole('ADMIN'),
        removeCourse)
    .post(
        isLoggedIn , 
        authorizedRole('ADMIN'),
        upload.single('thumbnail'),
        addLectureByPostId);


export default router;

