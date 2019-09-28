import * as mongoose from 'mongoose';

var teacher = new mongoose.Schema({
    user : {type: mongoose.SchemaTypes.ObjectId, ref:"theUsers"},
    job : {type: String},
    about : {type : String},
    qualification : {type: String},
    college : {type : String}
});

export var teacherModel = mongoose.model("theTeacher",teacher);