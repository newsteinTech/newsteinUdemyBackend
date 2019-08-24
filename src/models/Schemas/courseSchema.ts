import * as mongoose from 'mongoose';

var course = new mongoose.Schema({
    title : {type:String, required:true, unique:true},
    description : {type:String},
    teacher : {type:mongoose.SchemaTypes.ObjectId, ref:"theTeacher"},
    fee : {type:Number},
    rating : {type: Number, default:0},
    image : {type: String},
    comments : {type:mongoose.SchemaTypes.ObjectId, ref:"theComment"},
    student_count : {type:Number, default:0},
    contents : [{type:mongoose.SchemaTypes.ObjectId, ref:"theContent"}],
    status : {type:String, enum:["present","deleted"], default:"present"}
});

export var courseModel = mongoose.model("theCourse",course);