import {awsCloudWatch, awsParams} from "./aws-config.mjs";
import { v4 as uuidv4 } from "uuid";

const fetchParam = async (paramName) => {
    try {
        const param = await awsParams.getParameter({Name: paramName, WithDecryption: false}).promise();
        return param.Parameter.Value;
    } catch (error) {
        return error;
    }

}

const logEvent = async (message) => {
    try {
        const timestamp = Date.now();

        const params = {
            logGroupName: "todo-service-logs",
            logStreamName: "todo-requests-streams",
            logEvents: [
                {
                    message,
                    timestamp,
                },
            ],
        };

       await awsCloudWatch.putLogEvents(params).promise();

    } catch (error) {
        return error;
    }
}

const generateId = () => {
    return uuidv4();
};

export {fetchParam, logEvent, generateId}
