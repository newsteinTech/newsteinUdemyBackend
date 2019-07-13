import * as mongoose from 'mongoose';

var student = new mongoose.Schema({
    user : {type:mongoose.SchemaTypes.ObjectId, ref:"theUsers"},
    college : {type:String},
    department: {type:String},
    courses : [{type: mongoose.SchemaTypes.ObjectId , ref : "theCourse"}]
});

export var studentModel = mongoose.model("theStudent",student);