export class Authorize{
    public static authorizeStudent(req: any, res: any){

        if(req.user.role != "student"){
            console.log("Invalid User");
            res.send("Invalid User, Access Denied");
        }

        console.log(req.user);
    }

    public static authorizeTeacher(req: any, res: any){

        if(req.user.role != "teacher"){
            console.log("Invalid User");
            res.send("Invalid User, Access Denied");        
        }    
        console.log(req.user);
    }
}