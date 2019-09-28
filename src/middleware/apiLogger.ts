import * as jwt from 'jsonwebtoken';

export class ApiLogger{
    public static log(req:any, res:any, next:any)
    {
        try{
            console.log(req.params);
            console.log(req.body);
            next(); 
        }catch(err)
        {
            console.log("Error");
            return res.json(err);
        }
    }
}
