import {deleteData, fetchData, insertData, updateData} from "./core.mjs";
import {generateId} from "../utils/util.mjs";

const todoTable = 'todo-items';

const getTodos = async (userId) => {
    const params = {
        TableName: todoTable,
        IndexName: 'user_id-index',
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": userId,
        }
    }
    return fetchData(params);
}

const getTodo = async (userId, taskId) => {
    const params = {
        TableName: todoTable,
        KeyConditionExpression: "task_id = :task_id AND user_id = :user_id",
        ExpressionAttributeValues: {
            ":task_id": taskId,
            ":user_id": userId,
        }
    }
    return fetchData(params);
}


const insertTodo = async (task) => {
    const params = {
        TableName: todoTable,
        Item: {
            task_id: generateId(),
            user_id: task.userId,
            is_completed: task.completed,
            tasks: task.tasks,
        },
        ReturnValues: 'ALL_OLD'
    }
    return insertData(params);
}

const updateTodo = async (task) => {
    const params = {
        TableName: 'todo-items',
        Key: {
            task_id: task.taskId,
            user_id: task.userId,
        },
        UpdateExpression: 'set #tasks = :tasks, #is_completed = :is_completed',
        ExpressionAttributeNames: {
            '#tasks': 'tasks',
            '#is_completed': 'is_completed',
        },
        ExpressionAttributeValues: {
            ':tasks': task.tasks,
            ':is_completed': task.completed,
        },
        ReturnValues: 'UPDATED_NEW',
    }
    return updateData(params);
}

const deleteTodo = async (task) => {
    const params = {
        TableName: 'todo-items',
        Key: {
            task_id: task.taskId,
            user_id: task.userId,
        }
    }
    return deleteData(params);
}

export {getTodos, getTodo, insertTodo, updateTodo, deleteTodo}