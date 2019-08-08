import * as express from 'express';
import { courseController } from '../controller/courseController';
import { courseService } from '../service/courseService';
export const courseApp : express.Router = express.Router();

courseApp.post('/createCourse',courseController.createCourse);
courseApp.post('/createContent',courseController.createContent);
courseApp.post('/subscribeCourse',courseController.subscribeCourse);