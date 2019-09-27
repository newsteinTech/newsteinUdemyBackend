import * as express from "express";
import { userApp } from "../routes/userApp";
import { courseApp } from "../routes/courseApp";


export class Routes {
    public static registerRoutes(app: express.Application): void {      
        app.use('/user', userApp);
        app.use('/courses', courseApp);

        app.use('/', (req, res) => { res.send("server is up")});
    }
}