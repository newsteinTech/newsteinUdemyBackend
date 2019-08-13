import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ResponseModel } from '../models/Schemas/ResponseModel';
import { userModel } from '../models/Schemas/userSchema';
import { studentModel } from '../models/Schemas/studentSchema';
import { teacherModel } from '../models/Schemas/teacherSchema';
import { HelperClass } from './helperClass';

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
            console.log(user);

            await user.save();

            let msg = "Congratulations "+ user["name"] + ",\nYou have Successfully joined our online learning Portal.. Enjoy!!";
            let response = await HelperClass.sendMail(user,msg);
            console.log(response);
                
            if(user["role"]==="student"){
                let students = new studentModel();
                students["user"] = user._id;
                await students.save();
            }

            else if(user["role"]==="teacher"){
                let teacher = new teacherModel();
                teacher["user"] = user._id;
                await teacher.save();
            }

            return ResponseModel.getValidResponse("Details Are Recorded Successfully!!");               

        }catch(err){
            console.log("Error : ");
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
            user["profileStatus"] = "complete";

            await user.save();
            await student.save();
            return ResponseModel.getValidResponse("Student Details Recorded");
        }catch(err){
            console.log("Error");
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
            teacher["experience"] = req.body.experience;
            teacher["qualification"] = req.body.qualification;
            teacher["college"] = req.body.college;
            user["profileStatus"] = "complete";

            await user.save();
            await teacher.save();
            console.log(teacher);
            return ResponseModel.getValidResponse("Teacher Details Recorded");

        }catch(err){
            console.log("Error");
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
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async resetPassword(req){
        try{
            let users = await userModel.findOne({ mobile:req.body.mobile}).exec();
            let actual_password = await bcrypt.compare(req.body.password,users["password"]);

            if(!actual_password){
                return ResponseModel.getInValidResponse("Wrong Credentials");
            }
    
            let newPassword = await bcrypt.hash(req.body.newPassword,12);
            users["password"] = newPassword; 
            await users.save();
            return ResponseModel.getValidResponse("Password Updated Successfully");

        }catch(err){
            console.log("Error");
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

            let option : jwt.SignOptions = {
                expiresIn : "300h"
            };

            let payLoad = {
                "name" : user["name"],
                "mobile" : user["mobile"],
                "role" : user["role"]
            };

            let accessToken = jwt.sign(payLoad,"secret",option);
            return ResponseModel.getValidResponse(accessToken);
                        
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse("Invalid Credentials");
        }
    }

}