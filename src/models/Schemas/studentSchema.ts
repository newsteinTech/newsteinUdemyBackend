import * as mongoose from 'mongoose';
import { courseModel } from './courseSchema';

var student = new mongoose.Schema({
    name : {type:String},
    email : {type:String},
    phone : {type:Number},
    courses : [{type: mongoose.SchemaTypes.ObjectId , ref : "theCourse"}]
});

export var studentModel = mongoose.model("theStudent",student);