import * as express from 'express';
import { userService } from '../service/userService';

export class userController{
    
    public static async register(req : express.Request, res: express.Response)
    {
        let response = await userService.register(req);
        res.send(response);
    }


   public static async login(req : express.Request, res: express.Response)
   {
       let response = await userService.userLogin(req);
       res.send(response);
   }
}