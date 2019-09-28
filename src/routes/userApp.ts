import * as express from 'express';
import { userController } from '../controller/userController';
import { Authenticate } from '../middleware/authenticate';
import { Authorize } from '../middleware/authorize';
export const userApp : express.Router = express.Router();

// Registration and Login .....
userApp.post('/register',userController.register);
userApp.post('/login',userController.login);


// Getting Further Details based on their roles ....
userApp.post('/teacherDetails',Authenticate.authenticate, Authorize.authorizeTeacher ,userController.teacherDetails);
userApp.post('/studentDetails',Authenticate.authenticate, Authorize.authorizeStudent ,userController.studentDetails);

// To update the existing information ...
userApp.post('/updateUser',userController.updateUser);
userApp.post('/updateTeacher',userController.updateTeacher);
userApp.post('/updateStudent',userController.updateStudent);

// Password Recovery Methods ....
userApp.post('/forgotPassword',userController.forgotPassword);
userApp.post('/resetPassword',userController.resetPassword);