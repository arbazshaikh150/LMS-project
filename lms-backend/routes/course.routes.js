import {Router} from 'express';
import { getAllCourses, getLecturesByCourseId } from '../controllers/course.controller.js';

// .js error !!! 
const router = new Router();

//  Routes for the courses

// router.get('/' , getAllCourses);
//  Another method
router.route('/').get(getAllCourses);

router.get('/:id' , getLecturesByCourseId);


export default router;

