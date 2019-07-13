import * as express from 'express';
import * as nodeMailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ResponseModel } from '../models/Schemas/ResponseModel';
import { userModel } from '../models/Schemas/userSchema';
import { studentModel } from '../models/Schemas/studentSchema';
import { teacherModel } from '../models/Schemas/teacherSchema';


export class userService{

    public static async register(req : express.Request){
        try{
            let users = await userModel.findOne({ mobile: req.body.mobile }).exec();
            let password = await bcrypt.hash(req.body.password,12);
            req.body.password = password;
            console.log(password);

            if(users === null)
            {
                users = new userModel(req.body);
                console.log(users);

                let msg = "Congratulations...!! You have Successfully joined our online learning Portal.. Enjoy!!";
                let response = await userService.sendMail(users,msg);
                console.log(response);
                
                await users.save();

                if(users["isAstudent"]===true){
                    let students = new studentModel();
                    students["user"] = users._id;
                    await students.save();
                }

                else if(users["isAteacher"]===true){
                    let teacher = new teacherModel();
                    teacher["user"] = users._id;

                    await teacher.save();
                }

                return ResponseModel.getValidResponse(users);                
            }

            console.log("User Already Exists");
            return ResponseModel.getInValidResponse("User Already Exists");

        }catch(err){
            console.log("Error : ");
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async sendMail(users,messageByUser){
        try{
            let testAccount = await nodeMailer.createTestAccount();

            let transporter = nodeMailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, 
                auth: {
                  user: "yash.4198@gmail.com",
                  pass: "<password>"  // go to google less secure apps and click on turn ON button .... 
                }
              });
    
            let info = await transporter.sendMail({
                from: 'yash.4198@gmail.com', 
                to: users.email, 
                subject: "Test Mail",
                text: messageByUser // plain text body
            });
    
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));

            return ResponseModel.getValidResponse("Mail Sent Successfully");
        }catch(err){
            console.log("Failed to Send Mail");
            console.log(err);
            return ResponseModel.getInValidResponse("Failed to send Mail");
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

            user["password"] = "yashABCD";
            await user.save();

            let msg = "Your New Password : "+user["password"];
            let response = await userService.sendMail(user,msg);

            return ResponseModel.getValidResponse(response);
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

}