import * as express from 'express';
import * as mongoose from 'mongoose';
import { courseModel } from '../models/Schemas/courseSchema';
import { ResponseModel } from '../models/Schemas/ResponseModel';
import { contentModel } from '../models/Schemas/contentSchema';
import { studentModel } from '../models/Schemas/studentSchema';
import { subscribeModel } from '../models/Schemas/subscribtionSchema';
import { HelperClass } from './helperClass';
import { teacherModel } from '../models/Schemas/teacherSchema';

export class courseService{

    public static async createCourse(req){
        try{
            let len : number;
            let i : number;
            len = req.body.contents.length;

            let course = new courseModel();

            course["title"] = req.body.title;
            course["description"] = req.body.description;
            course["teacherId"] = req.body.teacherId;
            course["fee"] = req.body.fee;
            course["rating"] = req.body.rating;
            course["image"] = req.body.image;

            for(i=0; i<len;i++)
            {
                let content = new contentModel(req.body.contents[i]);
                course["contents"].push(content._id);
                await content.save();
            }

            console.log(course);
            await course.save();
            return ResponseModel.getValidResponse("Course Created Successfully");
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async deleteCourse(req){
        try{
            let course = await courseModel.findOne({_id : req.params.id}).exec();
            
            if(course === null){
                return ResponseModel.getInValidResponse("There is no Such Course");
            }
            course["status"] = "inactive";
            await course.save();

            return ResponseModel.getValidResponse("Course Is Deleted");
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async updateCourse(req){
        try{
            let course = await courseModel.findOne({_id : req.body.courseId}).exec();
            
            if(course === null){
                return ResponseModel.getInValidResponse("There is no such content");
            }

            await course.populate('contents').execPopulate();

            course = HelperClass.updateRecord(course,req.body);
            
            let len : number;
            let i : number;

            len = req.body.contents.length;

            for(i=0;i<len;i++){
                let content = await contentModel.findOne({ _id : req.body.contents[i].id}).exec();
                content = HelperClass.updateRecord(content,req.body.contents[i]);
                await content.save();
            }

            await course.save();
            console.log(course);
            return ResponseModel.getValidResponse("Course Updated Successfully");
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async subscribeCourse(req){
        try{
            let course = await courseModel.findOne({_id : req.body.courseId}).exec();
            let student = await studentModel.findOne({_id : req.body.studentId}).exec();

            if(course === null || student === null){
                return ResponseModel.getInValidResponse("Invalid Credentials");
            }

            let subscribeCourse = new subscribeModel(req.body);
            console.log(subscribeCourse);
            await subscribeCourse.save();

            return ResponseModel.getValidResponse("You have succesfully Subscribed to the course!!");            
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async getAllCourses(req){
        try{
            let course = await courseModel.find().exec();
            console.log(course);
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }
}