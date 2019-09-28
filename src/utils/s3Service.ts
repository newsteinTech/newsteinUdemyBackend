import {ResponseModel} from '../DTOs/ResponseModel';
import { Creds } from '../creds';

import * as AWS from 'aws-sdk';

export class S3Service {
    public static async upload(req, res) {
        try {
            let s3bucket = new AWS.S3({
                accessKeyId: Creds.accessKeyId,
                secretAccessKey: Creds.secretAccessKey,
                apiVersion: '2006-03-01'
              });

             let file = req.files.file;

             console.log(req.files.file.name)
            var params = {
                Key: file.name,
                Body: file.data,
                ACL: 'public-read',
                Bucket: Creds.bucketName
            };

            s3bucket.putObject(params).promise().then(data => {
                console.log('Successfully uploaded data ', data);
               
                return res.status(200).send(ResponseModel.getValidResponse(Creds.buildUploadedFileUrl(file.name)));
            }, error => {
                console.error(error, error.stack);
                return res.status(200).send(ResponseModel.getInValidResponse(error.message));
            })
        } catch (err) {
            console.log('ERROR MSG: ', err);
            return res.status(500).send(err);
        }
    }

    
}