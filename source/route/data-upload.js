/**
 * POST: Upload data to S3 bucket
 */
const express = require('express');
const router = express.Router();
const unixTimestamp = require('unix-timestamp');
const aws = require('aws-sdk');
const awsConfig = require('../aws.config');
const ep = new aws.Endpoint('http://localhost:8000/appdata');

const s3 = new aws.S3({
    endpoint: ep,
    s3ForcePathStyle: true,
    params: {
        Bucket: awsConfig.aws.bucket
    },
    credentials: awsConfig.aws.credentials
});

router.post('/dataupload', function (req, res) {
    if(checkForNullOrWhiteSpace(req.query.manufacturer_serial_number))
        return res.status(400).send({error: 'Error. No serial number found.'});

    let fileName = unixTimestamp.now() * 1000 + "~";
    for (let property in req.query) {
        let value = validateValue(req.query[property]);
        if (req.query.hasOwnProperty(property) && value) fileName += "~~" + property + "~" + value;
        else return res.status(400).send({error: 'Invalid input parameter. Five or more underscores not allowed.'});
    }
    fileName += ".json"
    let body = JSON.stringify(req.body);

    return saveFile(fileName, body)
        .then(function () {
            return res.status(201).send({FileName: fileName});
        })
        .catch(function (err) {
            return res.status(500).send({error: err});
        });
});
const saveFile = (fileName, body ) => {
    return new Promise((resolve, reject) => {
        s3.putObject({
            Bucket: 'appdata',
            Key: fileName,
            Body: body
        },(err) => {
            if (err)
                reject(err);
            else
                resolve(fileName);
        });
    });
};
const validateValue = function (value) {
    return !(value.includes("_____")) ? ((value.includes("~")) ? value.replace("~", "_____") : value) : null;
};
const checkForNullOrWhiteSpace = function(value)
{
    return value == undefined || value == "" || value == null;
}
module.exports = router;
