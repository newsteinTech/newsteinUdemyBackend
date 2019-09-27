import { Roles } from "../constants/roles";

export class Authorization {
    public static authorizeTeacher(req:any, res:any, next:any)
    {
        try{
            if(req.user.role != Roles.teacherRole){
                return res.status(401).send("Access Denied");
            }
            next(); 
        }catch(err) {
            return res.json(err);
        }
    }

    public static authorizeAdmin(req:any, res:any, next:any)
    {
        try{
            if(req.user.role != Roles.adminRole){
                return res.status(401).send("Access Denied");
            }
            next(); 
        }catch(err) {
            return res.json(err);
        }
    }
}