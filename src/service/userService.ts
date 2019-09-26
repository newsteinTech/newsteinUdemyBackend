import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ResponseModel } from '../models/Schemas/ResponseModel';
import { HelperClass } from './helperClass';
import { DbModel } from '../models/shared/dbModels';
import { TokenPayload } from '../DTOs/tokenPayload';
import { UserResponse } from '../DTOs/userResponse';
import { LoginResponse } from '../DTOs/loginResponse';

export class userService{

    public static async register(req : express.Request){
        try{
            let user = await DbModel.userModel.findOne({ mobile: req.body.mobile }).exec();
            if(user != null){
                return ResponseModel.getInValidResponse("Account Already exist with given mobile number");
            }

            let password = await bcrypt.hash(req.body.password,12);
            req.body.password = password;
            if (req.body.isTeacher) {
                req.body.role = "teacher"
            }

            let newUser: any = new DbModel.userModel(req.body);
            await newUser.save();

            // let msg = "Congratulations "+ user["name"] + ",\nYou have Successfully joined our online learning Portal.. Enjoy!!";
            // let response = await HelperClass.sendMail(user,msg);
            // console.log(response);
                
            if(newUser.role === "student"){
                let student = new DbModel.studentModel();
                student["user"] = newUser;
                await student.save();
            }

            else if(newUser["role"]==="teacher"){
                let teacher = new DbModel.teacherModel();
                teacher["user"] = newUser;
                await teacher.save();
            }

            return ResponseModel.getValidResponse("Registered success. Plz proceed to login");               
        }catch(err){
            console.log(err);
            return ResponseModel.getInValidResponse(err.message);
        }
    }

    public static async updateUser(req){
        try{
            let user = await DbModel.userModel.findOne({_id : req.body.userId}).exec();
            
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
            let user = await DbModel.userModel.findOne({mobile : req.body.mobile}).exec();
            
            if(user===null)
            {
                return ResponseModel.getInValidResponse("No such user Exist");
            }

            let actual_password = await bcrypt.compare(req.body.password,user["password"]);

            if(!actual_password)
            {
                return ResponseModel.getInValidResponse("Wrong Credentials");
            }

            let student = await DbModel.studentModel.findOne({user : user._id}).exec();
            
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
            let student = await DbModel.studentModel.findOne({_id : req.body.studentId}).exec();
            
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
            let user = await DbModel.userModel.findOne({mobile:req.body.mobile}).exec();
            
            if(user === null)
            {
                return ResponseModel.getInValidResponse("No Such User Exist");
            }

            let actual_password = await bcrypt.compare(req.body.password,user["password"]);
            
            if(!actual_password)
            {
                return ResponseModel.getInValidResponse("Wrong Credentials");
            }

            let teacher = await DbModel.studentModel.findOne({user: user._id}).exec();

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
            let teacher = await DbModel.studentModel.findOne({_id : req.body.teacherId}).exec();
            
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
            let user = await DbModel.userModel.findOne({mobile:req.body.mobile}).exec();
            
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
            let user = await DbModel.userModel.findOne({ mobile:req.body.mobile}).exec();
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
            // Check user with mobile number
            let user: any = await DbModel.userModel.findOne({mobile : req.body.mobile}).exec();
            if(user === null){
                return ResponseModel.getInValidResponse("User Does not exist");
            }

            // Compare Password
            let actualPassword = await bcrypt.compare(req.body.password,user["password"]);
            if(!actualPassword){
                return ResponseModel.getInValidResponse("Wrong Credentials");
            }

            // Create token
            let option : jwt.SignOptions = {
                expiresIn : "300h"
            };

            let payLoad: TokenPayload = new TokenPayload(user);
            let accessToken = await jwt.sign(payLoad,"secret",option);

            // Create login response
            let userResponse : UserResponse = new UserResponse(user);
            let loginResponse: LoginResponse = new LoginResponse(accessToken, userResponse);
   
            return ResponseModel.getValidResponse(loginResponse);
                        
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse("Invalid Credentials");
        }
    }

}