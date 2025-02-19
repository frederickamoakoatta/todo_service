import {awsDB, awsParams} from "../utils/aws-config.mjs";

const fetchParam = async (paramName) => {
    try{
        const param  = await awsParams.getParameter({Name: paramName, WithDecryption: false }).promise();
        return param.Parameter.Value;
    }
    catch (error) {
        return error;
    }

}

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

export {fetchParam, fetchData, insertData, updateData, deleteData};