import * as mongoose from 'mongoose';
import { contentModel } from './contentSchema';

var content = new mongoose.Schema({
    order : {type: Number},
    title : {type: String},
    video : {type: String}
    //subcontent : [{type: mongoose.SchemaTypes.ObjectId, ref:"theContent"}]
});


var course = new mongoose.Schema({
    title : {type:String, required:true},
    description : {type:String},
    teacher : {type:mongoose.SchemaTypes.ObjectId, ref:"theTeacher"},
    fee : {type:Number},
    rating : {type: Number, default:0},
    image : {type: String},
    comments : {type:mongoose.SchemaTypes.ObjectId, ref:"theComment"},
    student_count : {type:Number, default:0},
    contents : [{type: content}],
    status : {type:String, enum:["active","inactive"], default:"active"}
});

export var courseModel = mongoose.model("theCourse",course);