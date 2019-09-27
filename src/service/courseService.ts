import { courseModel } from '../models/Schemas/courseSchema';
import { ResponseModel } from '../models/Schemas/ResponseModel';
import { contentModel } from '../models/Schemas/contentSchema';
import { studentModel } from '../models/Schemas/studentSchema';
import { subscribeModel } from '../models/Schemas/subscribtionSchema';
import { HelperClass } from './helperClass';
import { DbModel } from '../models/shared/dbModels';

export class courseService{

    public static async createCourse(req){
        try{
            let course = new courseModel(req.body);
            await course.save();
            console.log(course);

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
            let courses = await DbModel.courseModel.find().populate({path: 'teacher'}).exec();
            
            return ResponseModel.getValidResponse(courses);
        }catch(err){
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async getCourse(req){
        try{
            let courses = await DbModel.courseModel.findById(req.params._id).populate({path: 'teacher'}).exec();
            
            return ResponseModel.getValidResponse(courses);
        }catch(err){
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }
}