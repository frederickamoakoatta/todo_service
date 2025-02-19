import {awsDB, awsParams} from "../utils/aws-config.mjs";

const fetchData = async (queryParams) => {
    try{
        const data = await awsDB.query(queryParams).promise();
        return data.Items;
    }
    catch (error) {
        return error;
    }
};

const insertData = async (queryParams) => {
    try {
        const data = await awsDB.put(queryParams).promise();
        return data.Attributes;
    }
    catch (error) {
        return error;
    }
};

const updateData = async (queryParams) => {
    try {
        const data = await awsDB.update(queryParams).promise();
        return data.Attributes;
    }
    catch (error) {
        return error;
    }
};

const deleteData = async (queryParams) => {
    try {
        const data = await awsDB.delete(queryParams).promise();
        return data.Attributes;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};

export {fetchData, insertData, updateData, deleteData};