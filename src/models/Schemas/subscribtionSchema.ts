import * as mongoose from 'mongoose';

var subscription = new mongoose.Schema({
    courseId : {type : String, required:true},
    studentId : {type : String, required:true},
    amount : {type : Number},
    paymentId : {type: String, required:true}
});

export var contentModel = mongoose.model("theSubscription",subscription);