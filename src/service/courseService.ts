import { courseModel } from '../models/Schemas/courseSchema';
import { ResponseModel } from '../DTOs/ResponseModel';
import { HelperClass } from './helperClass';
import { DbModel } from '../models/shared/dbModels';

export class courseService{

    public static async createCourse(req){
        try{
            let teacher: any = await DbModel.teacherModel.findOne({user: req.user._id}).exec();
            let course: any = new DbModel.courseModel(req.body);
            course.teacher = teacher;
            await course.save();

            return ResponseModel.getValidResponse(course);
        }catch(err){
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
            let course: any = await DbModel.courseModel.findOne({_id : req.body._id}).populate({path: 'teacher'}).exec();
            if(course === null){
                return ResponseModel.getInValidResponse("Course not found with given id: " + req.body._id);
            }

            // Verify Teacher's course
            if (course.teacher.user != req.user._id) {
                return ResponseModel.getInValidResponse("Bad request!");
            }

            course = HelperClass.updateRecord(course, req.body);
            await course.save();
            
            return ResponseModel.getValidResponse(course);
        }catch(err){
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async subscribeCourse(req){
        try{
            let course = await courseModel.findOne({_id : req.body.courseId}).exec();
            let student = await DbModel.studentModel.findOne({_id : req.body.studentId}).exec();

            if(course === null || student === null){
                return ResponseModel.getInValidResponse("Invalid Credentials");
            }

            let subscribeCourse = new DbModel.subscriptionModel(req.body);
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
            let courses = await DbModel.courseModel
            .find()
            .populate({path: 'teacher', populate: {path: 'user', select: '-password'}})
            .exec();
            
            return ResponseModel.getValidResponse(courses);
        }catch(err){
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }

    public static async getCourse(req){
        try{
            let course = await DbModel.courseModel
            .findById(req.params._id)
            .populate({path: 'teacher', populate: {path: 'user', select: '-password'}})
            .exec();
            
            return ResponseModel.getValidResponse(course);
        }catch(err){
            console.log(err);
            return ResponseModel.getInValidResponse(err);
        }
    }
}