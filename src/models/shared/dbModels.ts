import * as mongoose from 'mongoose';
import { Collections } from './collections';

import { UserSchema } from '../Schemas/userSchema';
import { TeacherSchema } from '../Schemas/teacherSchema';
import { StudentSchema } from '../Schemas/studentSchema';
import { CourseSchema } from '../Schemas/courseSchema';
import { SubscriptionSchema} from '../Schemas/subscriptionSchema'

export class DbModel {
    public static userModel = mongoose.model(Collections.userCollectionName, UserSchema);
    public static studentModel = mongoose.model(Collections.studentCollectionName, StudentSchema);
    public static teacherModel = mongoose.model(Collections.teacherCollectionName, TeacherSchema);

    public static courseModel = mongoose.model(Collections.courseCollectionName, CourseSchema);
    public static subscriptionModel = mongoose.model(Collections.SubscriptionCollectionName, SubscriptionSchema);

}