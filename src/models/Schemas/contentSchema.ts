import * as mongoose from 'mongoose';

var content = new mongoose.Schema({
    order : {type: Number},
    title : {type: String},
    courseName : {type: String},
    video : {type: String}
    //subcontent : [{type: mongoose.SchemaTypes.ObjectId, ref:"theContent"}]
});

export var contentModel = mongoose.model("theContent",content);