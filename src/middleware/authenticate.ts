import * as jwt from 'jsonwebtoken';
import { encryptionKey } from '../constants/encryptionKey';

export class Authenticate{
    public static authenticate(req:any, res:any, next:any)
    {
        try{
            let token = req.header("Authorization");
            if(!token)
            {
                return res.status(401).send("Access Denied");
            }

            let decryptToken = jwt.verify(token, encryptionKey.secretKey);
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
