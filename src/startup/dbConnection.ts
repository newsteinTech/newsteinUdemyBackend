import * as mongoose from 'mongoose';

export class dbConnection{
    public static connectDb() : void{
        let dbUrl = "mongodb://students:password1@ds239157.mlab.com:39157/newstein-students-db";
        let connectionPromise = mongoose.connect(dbUrl);

        connectionPromise.then(()=>{
            console.log("Connected Successfully");
        }).catch((err:any)=>{
           console.log("Connection failed"); 
        });
    }
}