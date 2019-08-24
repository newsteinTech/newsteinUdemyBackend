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
            let course = await courseModel.findOne({title : req.body.title}).exec();
            let teacher = await teacherModel.findOne({title : req.body.teacherId}).exec();

            if(course != null){
                return ResponseModel.getInValidResponse("Course Already Exist");
            }

            else if(teacher === null){
                return ResponseModel.getInValidResponse("Invalid Credentials");
            }

            course = new courseModel(req.body);
            teacher["courses_published"].push(course._id);
            
            await course.save();
            await teacher.save();
            return ResponseModel.getValidResponse("Course Created Successfully");
        }catch(err){
            console.log("Error : ");
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async deleteCourse(req){
        try{
            let course = await courseModel.findOne({_id : req.body.courseId}).exec();

            if(course === null){
                return ResponseModel.getInValidResponse("There is no Such Course");
            }
            course["status"] = "deleted";
            await course.save();
            return ResponseModel.getValidResponse("Course Is Deleted");
        }catch(err){
            console.log("Error : ");
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async updateCourse(req){
        try{
            let course = await courseModel.findOne({_id : req.body.courseId}).exec();
            
            if(course === null){
                return ResponseModel.getInValidResponse("There is no such content");
            }

            console.log(course);
            course = HelperClass.updateRecord(course,req.body);
            
            await course.save();
            console.log(course);
            return ResponseModel.getValidResponse("Course Updated Successfully");
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

    public static async updateContent(req){
        try{
            let content = await contentModel.findOne({_id : req.body.contentId}).exec();
            
            if(content === null){
                return ResponseModel.getInValidResponse("There is no such content");
            }

            console.log(content);
            content = HelperClass.updateRecord(content,req.body);
            
            await content.save();
            console.log(content);
            return ResponseModel.getValidResponse("Content Created Successfully");
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