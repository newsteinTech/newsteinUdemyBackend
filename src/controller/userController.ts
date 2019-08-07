import * as express from 'express';
import { userService } from '../service/userService';

export class userController{
    
    public static async register(req : express.Request, res: express.Response)
    {
        let response = await userService.register(req);
        res.send(response);
    }

    public static async teacherDetails(req : express.Request, res : express.Response)
    {
        let response = await userService.teacherDetails(req);
        res.send(response);
    }

    public static async studentDetails(req : express.Request, res : express.Response)
    {
        let response = await userService.studentDetails(req);
        res.send(response);
    }

    public static async forgotPassword(req: express.Request, res: express.Response)
    {
        let response = await userService.forgotPassword(req);
        res.send(response);
    }

    public static async resetPassword(req : express.Request, res: express.Response){
        let response = await userService.resetPassword(req);
        res.send(response);
    }

    public static async login(req : express.Request, res: express.Response)
    {
        let response = await userService.userLogin(req);
        res.send(response);
    }

}