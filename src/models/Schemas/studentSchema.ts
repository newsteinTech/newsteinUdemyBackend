import * as mongoose from 'mongoose';
import { Collections } from '../shared/collections';

export var StudentSchema = new mongoose.Schema({
    user : {type:mongoose.SchemaTypes.ObjectId, ref:Collections.userCollectionName}
});