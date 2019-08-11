import * as express from 'express';
import { courseController } from '../controller/courseController';

export const courseApp : express.Router = express.Router();

courseApp.post('/createCourse',courseController.createCourse);
courseApp.post('/deleteCourse',courseController.deleteCourse);

courseApp.post('/createContent',courseController.createContent);
courseApp.post('/updateContent',courseController.updateContent);

courseApp.post('/subscribeCourse',courseController.subscribeCourse);