import * as express from "express";
import { courseService } from "../service/courseService";

export class courseController{

    public static async createCourse(req : express.Request, res: express.Response){
        let response = await courseService.createCourse(req);
        res.send(response);
    }

    public static async createContent(req : express.Request, res: express.Response){
        let response = await courseService.createContent(req);
        res.send(response);
    }

   public static async subscribeCourse(req : express.Request, res: express.Response){
       let response = await courseService.subscribeCourse(req);
       res.send(response);
   }
   
}