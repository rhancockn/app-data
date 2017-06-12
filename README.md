# Description
This project is designed to accept a POST request with URL paramaters.  The URL paramaters will be used to create a JSON file that will be stored in S3.


# Creating an aws.config file
An aws.config file needs to be created to store the S3 credentials and bucket name.

It should be created under source/ directory and named aws.config.  
The format is as follows:
```
const aws = {
    bucket: 'BUCKET-NAME',
    credentials: {
        accessKeyId: 'ACCESS-KEY',
        secretAccessKey: 'SECRET-ACCESS-KEY'
    }
};
module.exports = {aws};
```
