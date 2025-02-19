import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-west-1',
    credentials: new AWS.SharedIniFileCredentials({ profile: "default" })
});


const awsParams =  new AWS.SSM();
const awsDB = new AWS.DynamoDB.DocumentClient();
const awsCloudWatch = new AWS.CloudWatch();

export {awsParams, awsCloudWatch, awsDB}