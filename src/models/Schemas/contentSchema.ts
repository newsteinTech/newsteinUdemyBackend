import * as mongoose from 'mongoose';

var content = new mongoose.Schema({
});

export var contentModel = mongoose.model("theContent",content);