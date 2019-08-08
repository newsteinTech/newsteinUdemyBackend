import * as mongoose from 'mongoose';

var subscribtion = new mongoose.Schema({
    courseId : {type : String, required:true},
    studentId : {type : String, required:true},
    amount : {type : Number},
    paymentId : {type: String, required:true}
});

export var subscribeModel = mongoose.model("theSubscription",subscribtion);