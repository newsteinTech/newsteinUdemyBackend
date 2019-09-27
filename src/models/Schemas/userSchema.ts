import * as mongoose from 'mongoose';
import { Roles } from '../../constants/roles';

export var UserSchema = new mongoose.Schema({
    name : {type: String},
    email : {type: String, unique:true},
    mobile : {type: Number, unique:true},
    password : {type: String, required:true},
    role : {type:String, enum:[Roles.studentRole, Roles.teacherRole, Roles.adminRole], default: Roles.studentRole},
    profilePic : {type:String},
    isProfileComplete : {type:Boolean, default:false},
});

export var userModel = mongoose.model("theUsers",UserSchema);