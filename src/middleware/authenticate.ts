import * as jwt from 'jsonwebtoken';

export class Authenticate{
    public static authenticate(req:any, res:any, next:any)
    {
        try{
            let token = req.header("Authorization");
            if(!token)
            {
                return res.send("Access Denied");
            }

            let decryptToken = jwt.verify(token,"secret");
            console.log(decryptToken);
            req.user = decryptToken;
            next(); 
        }catch(err)
        {
            console.log("Error");
            return res.json(err);
        }
    }
}
