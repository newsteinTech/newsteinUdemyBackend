import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { DbConnection } from './startup/dbConnection';
import { Routes } from "./startup/router";
import { ApiLogger } from './middleware/apiLogger';

class Server{
    private static PORT: number = 5000;
    public app : express.Application;

    public constructor(){
        this.app = express();   

        this.configBodyParser();
        this.app.use(cors());
        this.registerMiddleWares();

        DbConnection.connectDb();
        Routes.registerRoutes(this.app);

        this.app.listen(Server.PORT,"localhost",()=>{
            console.log("App is running fine on port: ", Server.PORT);
        });
    }

    private configBodyParser():void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended : false}));
    }

    private registerMiddleWares() {
        this.app.use(ApiLogger.log);
    }
}

let obj : Server;
obj = new Server();
