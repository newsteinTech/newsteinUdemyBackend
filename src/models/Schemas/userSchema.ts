import * as mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
    name : {type: String},
    email : {type: String, unique:true},
    mobile : {type: Number, unique:true},
    password : {type: String, required:true},
    role : {type:String, enum:["student","teacher","admin"], default:"created"},
    profilePic : {type:String},
    profileStatus : {type:String, enum:["incomplete","complete"], default:"incomplete"},
});

export var userModel = mongoose.model("theUsers",userSchema);