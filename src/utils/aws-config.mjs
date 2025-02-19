import AWS from 'aws-sdk';

// Only set explicit credentials for local development
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  // Local development - use profile credentials
  AWS.config.update({
    region: 'us-west-1',
    credentials: new AWS.SharedIniFileCredentials({ profile: "default" })
  });
} else {
  // Lambda environment - just set the region
  // Credentials will be automatically provided by the Lambda execution role
  AWS.config.update({
    region: process.env.AWS_REGION || 'us-west-1'
  });
}

const awsParams = new AWS.SSM();
const awsDB = new AWS.DynamoDB.DocumentClient();
const awsCloudWatch = new AWS.CloudWatchLogs();

export { awsParams, awsCloudWatch, awsDB }