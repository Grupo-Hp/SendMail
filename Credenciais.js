require('dotenv').config()

module.exports = {
    AwsConfig: {
        "region": "us-east-1",
        "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
        "accessKeyId": process.env.AWS_CONFIG_USER, 
        "secretAccessKey": process.env.AWS_CONFIG_PASS
    }
}

