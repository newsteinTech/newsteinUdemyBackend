import * as mongoose from 'mongoose';
import { Collections } from './collections';

import { UserSchema } from '../Schemas/userSchema';

export class DbModel {
    public static userModel = mongoose.model(Collections.userCollectionName, UserSchema);
    public static studentModel = mongoose.model(Collections.userCollectionName, UserSchema);
    public static teacherModel = mongoose.model(Collections.userCollectionName, UserSchema);
}