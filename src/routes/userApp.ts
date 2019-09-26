import * as express from 'express';
import { userController } from '../controller/userController';
export const userApp : express.Router = express.Router();

userApp.post('/register',userController.register);
userApp.post('/login',userController.login);
userApp.post('/updateUser',userController.updateUser);

userApp.post('/teacherDetails',userController.teacherDetails);
userApp.post('/studentDetails',userController.studentDetails);
userApp.post('/updateTeacher',userController.updateTeacher);
userApp.post('/updateStudent',userController.updateStudent);

userApp.post('/forgotPassword',userController.forgotPassword);
userApp.post('/resetPassword',userController.resetPassword);