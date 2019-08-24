import * as mongoose from 'mongoose';

var teacher = new mongoose.Schema({
    user : {type: mongoose.SchemaTypes.ObjectId, ref:"theUsers"},
    job : {type: String},
    about : {type : String},
    qualification : {type: String},
    college : {type : String},
    courses_published : [{type: mongoose.SchemaTypes.ObjectId, ref:"theCourse"}]
});

export var teacherModel = mongoose.model("theTeacher",teacher);