import * as express from 'express';
import { courseController } from '../controller/courseController';

export const courseApp : express.Router = express.Router();

courseApp.post('/createCourse',courseController.createCourse);
courseApp.post('/updateCourse',courseController.updateCourse);
courseApp.get('/deleteCourse/:id',courseController.deleteCourse);
courseApp.get('/allCourses',courseController.getAllCourses);
courseApp.post('/subscribeCourse',courseController.subscribeCourse);