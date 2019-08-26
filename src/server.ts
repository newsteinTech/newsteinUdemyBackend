import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { dbConnection } from './startup/dbConnection';
import { userApp } from './routes/userApp';
import { Authenticate } from './middleware/authenticate';
import { courseApp } from './routes/courseApp';

class Server{
    public app : express.Application;

    private configBodyParser():void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended : false}));
    }

    public constructor(){
        this.app = express();
        this.app.listen(3000,"localhost",()=>{
            console.log("App is running fine");
        });

        this.configBodyParser();
        dbConnection.connectDb();
        this.app.use(cors());
        
        this.app.use("/user",userApp);
        this.app.use("/course",courseApp);

    }
}

let obj : Server;
obj = new Server();
