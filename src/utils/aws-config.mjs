import AWS from 'aws-sdk';

if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    AWS.config.update({
        region: 'us-west-1',
        credentials: new AWS.SharedIniFileCredentials({profile: "default"})
    });
} else {
    AWS.config.update({
        region: process.env.AWS_REGION || 'us-west-1'
    });
}

const awsParams = new AWS.SSM();
const awsDB = new AWS.DynamoDB.DocumentClient();
const awsCloudWatch = new AWS.CloudWatchLogs();

export {awsParams, awsCloudWatch, awsDB}