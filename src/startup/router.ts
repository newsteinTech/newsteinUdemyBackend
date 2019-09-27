import * as express from "express";
import { userApp } from "../routes/userApp";
import { courseApp } from "../routes/courseApp";
import {S3Service} from '../utils/s3Service';

import * as fileUpload from "express-fileupload";
import { Authenticate } from "../middleware/authenticate";

export class Routes {
    public static registerRoutes(app: express.Application): void {   
        // File upload
        app.use(fileUpload());
        app.use('/upload', Authenticate.authenticate, S3Service.upload);

        app.use('/user', userApp);
        app.use('/courses', courseApp);

        app.use('/', (req, res) => { res.send("server is up")});
    }
}