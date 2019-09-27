import * as mongoose from 'mongoose';
import { Collections } from '../shared/collections';

export var TeacherSchema = new mongoose.Schema({
    user : {type: mongoose.SchemaTypes.ObjectId, ref: Collections.userCollectionName},
    about : {type : String}
});

export var teacherModel = mongoose.model("theTeacher",TeacherSchema);