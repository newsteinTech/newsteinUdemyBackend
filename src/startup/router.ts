import * as express from "express";
import { userApp } from "../routes/userApp";


export class Routes {
    public static registerRoutes(app: express.Application): void {      
        app.use('/user', userApp);

        app.use('/', (req, res) => { res.send("server is up")});
    }
}