import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ResponseModel } from '../models/Schemas/ResponseModel';
import { userModel } from '../models/Schemas/userSchema';
import { studentModel } from '../models/Schemas/studentSchema';
import { teacherModel } from '../models/Schemas/teacherSchema';
import { HelperClass } from './helperClass';
import { Roles } from '../constants/roles';
import { tokenGenerator } from '../DTO/tokenGenerator';
import { loginResponse } from '../DTO/loginResponse';
import { userResponse } from '../DTO/userResponse';
import { encryptionKey } from '../constants/encryptionKey';

export class userService{

    public static async register(req : express.Request){
        try{
            let user = await userModel.findOne({ mobile: req.body.mobile }).exec();

            if(user!=null)
            {
                console.log("User Already Exist");
                return ResponseModel.getInValidResponse("Account Already exist");
            }

            let password = await bcrypt.hash(req.body.password,12);
            req.body.password = password;

            user = new userModel(req.body);
            await user.save();

            let msg = "Congratulations "+ user["name"] + ",\nYou have Successfully joined our Online learning Portal.. Enjoy!!";
            let response = await HelperClass.sendMail(user,msg);
            console.log(response);
                
            if(user["role"] === Roles.student ){
                let students = new studentModel();
                students["user"] = user._id;
                await students.save();
            }

            else if(user["role"]=== Roles.teacher){
                let teacher = new teacherModel();
                teacher["user"] = user._id;
                await teacher.save();
            }

            return ResponseModel.getValidResponse("Registered success. Plz proceed to login");               

        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async updateUser(req){
        try{
            let user = await userModel.findOne({_id : req.body.userId}).exec();
            
            if(user === null){
                return ResponseModel.getInValidResponse("There is no such user");
            }

            console.log(user);
            user = HelperClass.updateRecord(user,req.body);
            
            await user.save();
            console.log(user);
            return ResponseModel.getValidResponse("User Details Updated Successfully");
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    
    public static async studentDetails(req){
        try{
            let user = await userModel.findOne({mobile : req.body.mobile}).exec();
            
            if(user===null)
            {
                return ResponseModel.getInValidResponse("No such user Exist");
            }

            let actual_password = await bcrypt.compare(req.body.password,user["password"]);

            if(!actual_password)
            {
                return ResponseModel.getInValidResponse("Wrong Credentials");
            }

            let student = await studentModel.findOne({user : user._id}).exec();
            
            if(student===null)
            {
                return ResponseModel.getInValidResponse("There is no such Student");
            }

            student["college"] = req.body.college;
            student["department"] = req.body.department;
            user["profilePic"] = req.body.profilePic;
            user["profileStatus"] = true;

            await user.save();
            await student.save();
            return ResponseModel.getValidResponse("Student Details Recorded");
        }catch(err){
            console.log("Error");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async updateStudent(req){
        try{
            let student = await studentModel.findOne({_id : req.body.studentId}).exec();
            
            if(student === null){
                return ResponseModel.getInValidResponse("There is no such student");
            }

            console.log(student);
            student = HelperClass.updateRecord(student,req.body);
            
            await student.save();
            console.log(student);
            return ResponseModel.getValidResponse("Student Details Updated Successfully");
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async teacherDetails(req){
        try{
            let user = await userModel.findOne({mobile:req.body.mobile}).exec();
            
            if(user === null)
            {
                return ResponseModel.getInValidResponse("No Such User Exist");
            }

            let actual_password = await bcrypt.compare(req.body.password,user["password"]);
            
            if(!actual_password)
            {
                return ResponseModel.getInValidResponse("Wrong Credentials");
            }

            let teacher = await teacherModel.findOne({user: user._id}).exec();

            teacher["job"] = req.body.job;
            teacher["about"] = req.body.about;
            teacher["qualification"] = req.body.qualification;
            teacher["college"] = req.body.college;
            user["profilePic"] = req.body.profilePic;
            user["profileStatus"] = true;

            await user.save();
            await teacher.save();
            console.log(teacher);
            return ResponseModel.getValidResponse("Teacher Details Recorded");

        }catch(err){
            console.log("Error");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async updateTeacher(req){
        try{
            let teacher = await teacherModel.findOne({_id : req.body.teacherId}).exec();
            
            if(teacher === null){
                return ResponseModel.getInValidResponse("There is no such Teacher");
            }

            console.log(teacher);
            teacher = HelperClass.updateRecord(teacher,req.body);
            
            await teacher.save();
            console.log(teacher);
            return ResponseModel.getValidResponse("Teacher Details Updated Successfully");
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async forgotPassword(req){
        try{
            let user = await userModel.findOne({mobile:req.body.mobile}).exec();
            
            if(user===null)
            {
                return ResponseModel.getInValidResponse("No Such User Exist");
            }

            let temp_password = "yash@1998";
            user["password"] = await bcrypt.hash(temp_password,12);
            await user.save();

            let msg = "Your New Password : "+temp_password;
            let response = await HelperClass.sendMail(user,msg);

            return ResponseModel.getValidResponse(response);
        }catch(err){
            console.log("Error");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async resetPassword(req){
        try{
            let user = await userModel.findOne({ mobile:req.body.mobile}).exec();
            let actualPassword = await bcrypt.compare(req.body.password,user["password"]);

            if(!actualPassword){
                return ResponseModel.getInValidResponse("Wrong Credentials");
            }
    
            let newPassword = await bcrypt.hash(req.body.newPassword,12);
            user["password"] = newPassword; 
            await user.save();
            return ResponseModel.getValidResponse("Password Updated Successfully");

        }catch(err){
            console.log("Error");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async userLogin(req){
        try{
            let user = await userModel.findOne({mobile : req.body.mobile}).exec();

            if(user === null)
            {
                console.log(user);
                return ResponseModel.getInValidResponse("User Does not exist");
            }

            let actualPassword = await bcrypt.compare(req.body.password,user["password"]);

            if(!actualPassword){
                console.log("Error");
                return ResponseModel.getInValidResponse("Wrong Credentials");
            }

            let option : jwt.SignOptions = {
                expiresIn : "300h"
            };

            let userData = new userResponse(user);
            let payLoad = new tokenGenerator(user);

            let accessToken = await jwt.sign(payLoad, encryptionKey.secretKey, option);

            let token = new loginResponse(accessToken, userData);

            
            console.log(token);
            return ResponseModel.getValidResponse(token);
                        
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse("Invalid Credentials");
        }
    }

}