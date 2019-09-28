import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { dbConnection } from './startup/dbConnection';
import { userApp } from './routes/userApp';
import { Authenticate } from './middleware/authenticate';
import { courseApp } from './routes/courseApp';
import { ApiLogger } from './middleware/apiLogger';
import * as fileUpload from 'express-fileupload';
import * as compression from 'compression';
import { S3service } from './utils/S3service';

class Server{
    public app : express.Application;

    private configBodyParser():void{
        this.app.use(bodyParser.urlencoded({extended : true}));
        this.app.use(bodyParser.json());
    }

    public constructor(){
        this.app = express();
        this.app.listen(3000,"localhost",()=>{
            console.log("App is running fine");
        });

        this.configBodyParser();
        dbConnection.connectDb();
        this.app.use(cors());
        this.app.use(fileUpload());
        //this.app.use(compression());
        //this.app.use(ApiLogger.log);
        
        this.app.use("/user",userApp);
        this.app.use("/course",courseApp);
        this.app.use("/upload",S3service.upload);

    }
}

let obj : Server;
obj = new Server();
