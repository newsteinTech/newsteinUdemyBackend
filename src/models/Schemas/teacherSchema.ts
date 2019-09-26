import * as mongoose from 'mongoose';
import { Collections } from '../shared/collections';

var teacher = new mongoose.Schema({
    user : {type: mongoose.SchemaTypes.ObjectId, ref: Collections.userCollectionName},
    about : {type : String}
});

export var teacherModel = mongoose.model("theTeacher",teacher);