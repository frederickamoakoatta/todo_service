import {awsDB} from "./config.mjs";

const usersTable = 'todo-users';

const params = {
    TableName: usersTable,
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
        ":user_id": "1"
    }
}

const testDB = async () => {
    const data = await awsDB.query(params).promise();
    console.log(data.Items)
}

