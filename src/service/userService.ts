import * as express from 'express';
import * as nodeMailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ResponseModel } from '../models/Schemas/ResponseModel';
import { userModel } from '../models/Schemas/userSchema';


export class userService{

    public static async register(req : express.Request){
        try{
            let users = await userModel.findOne({ mobile: req.body.mobile}).exec();
            let password = await bcrypt.hash(req.body.password,12);
            req.body.password = password;
            console.log(password);

            if(users === null)
            {
                users = new userModel(req.body);
                console.log(users);

                let response = await userService.sendMail(users);
                console.log(response);
                
                await users.save();
                return ResponseModel.getValidResponse(users);                
            }

            console.log("User Already Exists");
            return ResponseModel.getInValidResponse("User Already Exists");

        }catch(err){
            console.log("Error : ");
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async sendMail(users){
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
                text: "Congratulations!!!! You have successfully joined our online Learning portal. Enjoy!!", // plain text body
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