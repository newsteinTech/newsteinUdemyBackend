import * as mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
    name : {type: String},
    email : {type: String, unique:true},
    mobile : {type: Number, unique:true},
    password : {type: String, required:true}
});

export var userModel = mongoose.model("theUsers",userSchema);