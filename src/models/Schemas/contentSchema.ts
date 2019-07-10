import * as mongoose from 'mongoose';

var content = new mongoose.Schema({
    order : {type: Number},
    title : {type: String},
    video : {type: mongoose.SchemaTypes.DocumentArray},
    subcontent : [{type: mongoose.SchemaTypes.ObjectId, ref:"theContent"}]
});

export var contentModel = mongoose.model("theContent",content);