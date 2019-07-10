import * as mongoose from 'mongoose';

var comment = new mongoose.Schema({
    comment : {type: String},
    students : {type: mongoose.SchemaTypes.ObjectId, ref:"theStudent"}
});

export var commentModel = mongoose.model("theComment",comment);