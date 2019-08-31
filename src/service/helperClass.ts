import * as nodeMailer from 'nodemailer';
import { ResponseModel } from '../models/Schemas/ResponseModel';

export class HelperClass{

    public static async sendMail(users,messageForUser){
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
                to: users["email"], 
                subject: "Account Details",
                text: messageForUser // plain text body
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

    public static updateRecord(source,destination){
        for (var prop in destination) {
            if (prop == "_id" || prop == "__v") {
                continue;
            }

            if (destination.hasOwnProperty(prop)) {
                source[prop] = destination[prop];
            }
        }

        return source       
    }

}