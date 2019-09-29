import * as express from 'express';
import { courseController } from '../controller/courseController';
import { Authenticate } from '../middleware/authenticate';
import { Authorization } from '../middleware/authorization';

export const courseApp : express.Router = express.Router();

courseApp.post('/', [Authenticate.authenticate, Authorization.authorizeTeacher], courseController.createCourse);
courseApp.put('/', [Authenticate.authenticate, Authorization.authorizeTeacher], courseController.updateCourse);
courseApp.delete('/:_id', [Authenticate.authenticate, Authorization.authorizeAdmin], courseController.deleteCourse);
courseApp.get('/', Authenticate.authenticate, courseController.getAllCourses);
courseApp.get('/:_id', Authenticate.authenticate, courseController.getCourse);

//courseApp.post('/subscribeCourse', Authenticate.authenticate, courseController.subscribeCourse);