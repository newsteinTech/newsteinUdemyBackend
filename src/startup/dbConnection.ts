import * as mongoose from 'mongoose';

export class dbConnection{
    public static connectDb() : void{
        let dbUrl = "mongodb://students:password1@ds239157.mlab.com:39157/newstein-students-db"; 
        //let dbUrl = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb";
        let connectionPromise = mongoose.connect(dbUrl);

        connectionPromise.then(()=>{
            console.log("Connected Successfully");
        }).catch((err:any)=>{
           console.log("Connection failed"); 
        });
    }
}