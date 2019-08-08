import * as express from 'express';
import * as mongoose from 'mongoose';
import { courseModel } from '../models/Schemas/courseSchema';
import { ResponseModel } from '../models/Schemas/ResponseModel';
import { contentModel } from '../models/Schemas/contentSchema';
import { studentModel } from '../models/Schemas/studentSchema';
import { subscribeModel } from '../models/Schemas/subscribtionSchema';

export class courseService{

    public static async createCourse(req){
        try{
            let course = await courseModel.findOne({title : req.body.title}).exec();
            if(course != null){
                return ResponseModel.getInValidResponse("Course Already Exist");
            }

            course = new courseModel(req.body);
            await course.save();

            return ResponseModel.getValidResponse("Course Created Successfully");
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async createContent(req){
        try{
            let course = await courseModel.findOne({_id : req.body.courseId}).exec();
            
            let content = new contentModel(req.body);
            course["contents"].push(content._id);

            console.log(course);
            console.log(content);

            await content.save();
            await course.save();
            return ResponseModel.getValidResponse("Content Created Successfully");
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async subscribeCourse(req){
/*
        try{
            let subscribeCourse = new subscribeModel(req.body);

            let course = await courseModel.findOne({_id : req.body.courseId}).exec();
            let student = await studentModel.findOne({_id : req.body.studentId}).exec();

            if(course === null || student === null){
                return ResponseModel.getInValidResponse("Invalid Credentials");
            }

            console.log(subscribeCourse);
            await subscribeCourse.save();

            return ResponseModel.getValidResponse("You have succesfully Subscribed to the course!!");            
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
*/
    }

}