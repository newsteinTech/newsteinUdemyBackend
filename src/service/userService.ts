import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ResponseModel } from '../models/Schemas/ResponseModel';
import { userModel } from '../models/Schemas/userSchema';
import { studentModel } from '../models/Schemas/studentSchema';
import { teacherModel } from '../models/Schemas/teacherSchema';
import { helperClass } from './helperClass';
import { courseModel } from '../models/Schemas/courseSchema';
import { contentModel } from '../models/Schemas/contentSchema';


export class userService{

    public static async register(req : express.Request){
        try{
            let users = await userModel.findOne({ mobile: req.body.mobile }).exec();
            let password = await bcrypt.hash(req.body.password,12);
            req.body.password = password;

            if(users!=null)
            {
                console.log("User Already Exist");
                return ResponseModel.getInValidResponse("Account Already exist");
            }


            users = new userModel(req.body);
            console.log(users);

            await users.save();

            let msg = "Congratulations...!! You have Successfully joined our online learning Portal.. Enjoy!!";
            let response = await helperClass.sendMail(users,msg);
            console.log(response);
                
            if(users["role"]==="student"){
                let students = new studentModel();
                students["user"] = users._id;
                await students.save();
            }

            else if(users["role"]==="teacher"){
                let teacher = new teacherModel();
                teacher["user"] = users._id;
                await teacher.save();
            }

            return ResponseModel.getValidResponse(users);                

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
            let response = await helperClass.sendMail(user,msg);

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
                expiresIn : "1h"
            };

            let payLoad = {
                "userId" : user._id,
                "name" : user["name"],
                "mobile" : user["mobile"]
            };

            let accessToken = jwt.sign(payLoad,"secret",option);
            return ResponseModel.getValidResponse(accessToken);
                        
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse("Invalid Credentials");
        }
    }


    /* Create Course API   */
    public static async createCourse(req){
        try{
            let course = await courseModel.findOne({title : req.body.title});
            if(course!=null){
                return ResponseModel.getInValidResponse("Course Already Exists");
            }

            course = new courseModel(req.body);
            await course.save();
            console.log(course);
            return ResponseModel.getValidResponse("Course Created Successfully");

        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async createContent(req){
        try{
            let course = await courseModel.findOne({title : req.body.courseName});
            if(course===null){
                return ResponseModel.getInValidResponse("No Such course Exist");
            }
           
            let content = new contentModel(req.body);
            await content.save();

            course["contents"].push(content._id);
            await course.save();
            console.log(course);
            console.log(content);
            
            return ResponseModel.getValidResponse("Content Created Successfully");
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }
    
}