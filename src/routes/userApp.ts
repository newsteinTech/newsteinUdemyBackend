import * as express from 'express';
import { userController } from '../controller/userController';
import { Authenticate } from '../middleware/authenticate';
import { Authorization } from '../middleware/authorization';

export const userApp : express.Router = express.Router();

userApp.post('/register',userController.register);
userApp.post('/login',userController.login);
// userApp.post('/updateUser',userController.updateUser);

userApp.post('/teacherDetails', [Authenticate.authenticate, Authorization.authorizeTeacher], userController.teacherDetails);
// userApp.post('/studentDetails',userController.studentDetails);
// userApp.post('/updateTeacher',userController.updateTeacher);
// userApp.post('/updateStudent',userController.updateStudent);

userApp.post('/forgotPassword',userController.forgotPassword);
userApp.post('/resetPassword',userController.resetPassword);