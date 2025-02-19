import {deleteData, fetchData, insertData, updateData} from "./core.mjs";
import {getMockTodo, getMockTodos} from "../utils/mocks.mjs";
import {generateId} from "../utils/util.mjs";

const todoTable = 'todo-items';
const isLocalEnvironment = process.env.IS_LOCAL === 'true' || process.env.SAM_LOCAL;

const getTodos = async (userId) => {
    if (isLocalEnvironment) {
        console.log('[DEBUG] Using mock data for local environment');
        return getMockTodos(userId);
    }
    
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
    if (isLocalEnvironment) {
        return getMockTodo(userId, taskId);
    }
    
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

// Add similar mock data handling for other functions
const insertTodo = async (task) => {
    if (isLocalEnvironment) {
        console.log('[DEBUG] Mock insert:', task);
        return { success: true };
    }
    
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