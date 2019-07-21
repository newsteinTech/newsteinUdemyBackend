import * as mongoose from 'mongoose';

var course = new mongoose.Schema({
    contents : [{type:mongoose.SchemaTypes.ObjectId, ref:"theContent"}],
    description : {type:String},
    teacher : {type:mongoose.SchemaTypes.ObjectId, ref:"theTeacher"},
    fee : {type:Number},
    comments : {type:mongoose.SchemaTypes.ObjectId, ref:"theComment"},
    student_count : {type:Number}
});

export var courseModel = mongoose.model("theCourse",course);