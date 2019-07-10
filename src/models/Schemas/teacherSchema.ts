import * as mongoose from 'mongoose';

var teacher = new mongoose.Schema({
    name : {type: String},
    email : {type: String},
    mobile : {type: Number},
    courses_published : [{type: mongoose.SchemaTypes.ObjectId, ref:"theCourse"}]
});

export var teacherModel = mongoose.model("theTeacher",teacher);