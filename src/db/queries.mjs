import {db} from "./config.mjs";
import {usersTable} from "../utils/constants.mjs";

const params = {
    TableName: usersTable,
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
        ":user_id": "1"
    }
}
const testDB = async () => {
    const data = await db.query(params).promise();
    console.log(data.Items)
}

export default testDB;
