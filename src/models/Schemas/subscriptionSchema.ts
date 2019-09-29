import * as mongoose from 'mongoose';
import { Collections } from '../shared/collections';

export var SubscriptionSchema = new mongoose.Schema({
    course: {type:mongoose.SchemaTypes.ObjectId, ref:Collections.courseCollectionName},
    student : {type:mongoose.SchemaTypes.ObjectId, ref:Collections.studentCollectionName},

    createdAt: { type: Date, default: Date.now},

    amount: Number,
    paymentRef: String,
    period: Number // in days
});