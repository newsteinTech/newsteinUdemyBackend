import * as AWS from 'aws-sdk';
import { AWScredentials } from '../constants/awsCredentials';
import { ResponseModel } from '../models/Schemas/ResponseModel';

export class S3service{
    public static async upload(req, res) {
        try {
            let s3bucket = new AWS.S3({
                accessKeyId: AWScredentials.key,
                secretAccessKey: AWScredentials.pass,
                apiVersion: '2006-03-01'
              });

             let file = req.files.file;

             console.log(req.files.file.name);
            var params = {
                Key: file.name,
                Body: file.data,
                ACL: 'public-read',
                Bucket: AWScredentials.bucketName
            };

            s3bucket.putObject(params).promise().then(data => {
                console.log('Successfully uploaded data ', data);
               
                return res.status(200).send(ResponseModel.getValidResponse(AWScredentials.urlName(file.name)));
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