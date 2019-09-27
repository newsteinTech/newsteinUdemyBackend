import * as mongoose from 'mongoose';

var ContentSchema = new mongoose.Schema({
    title : String,
    video : String,
    subContents : [{
        title : String,
        video : String,
    }]
});

export var CourseSchema = new mongoose.Schema({
    teacher : {type:mongoose.SchemaTypes.ObjectId, ref:"theTeacher"},

    title : {type:String, required:true},
    description : {type:String},
    fee : {type:Number},
    rating : {type: Number, default:0},
    image : String,
    previewVideo: String,
    
    contents : [ContentSchema],
    isActive: { type: Boolean, default: true }
});

export var courseModel = mongoose.model("theCourse", CourseSchema);