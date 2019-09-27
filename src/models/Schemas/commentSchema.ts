import * as mongoose from 'mongoose';
import { Collections } from '../shared/collections';

var comment = new mongoose.Schema({
    course : { type: mongoose.SchemaTypes.ObjectId, ref: Collections.courseCollectionName},
    comment : {type: String},
    student : {type: mongoose.SchemaTypes.ObjectId, ref: Collections.studentCollectionName}
});

export var commentModel = mongoose.model("theComment",comment);