export class ApiLogger{
    public static log(req:any, res:any, next:any)
    {
        try{
            console.log("Request Params: ", req.params);
            console.log("Request Body: ", req.body);
            next(); 
        }catch(err)
        {
            console.log("Error");
            return res.json(err.message);
        }
    }
}