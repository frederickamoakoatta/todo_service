import {Router} from "express";
import {deleteTodo, getTodo, getTodos, insertTodo, updateTodo} from "../db/todo-queries.mjs";
import {errorHandler, idValidator, statusValidator, taskValidator} from "../utils/middlewares.mjs";

const todoRouter = Router();


todoRouter.get("/todos", async (req, res) => {
    try {
        // Use the normalized userId we stored
        const userId = req.userId || req.headers.userid;
        console.log(`[DEBUG] Getting todos for user: ${userId}`);
        
        const todos = await getTodos(userId);
        
        // Add more detailed logging
        console.log(`[DEBUG] getTodos result:`, JSON.stringify(todos));
        
        if (todos?.statusCode) {
            return res.status(todos?.statusCode).send({statusCode: todos?.statusCode, message: todos?.message});
        }
        
        return res.status(200).send({statusCode: 200, data: todos});
    } catch (error) {
        console.error('[ERROR] Error fetching todos:', error);
        return res.status(500).send({
            statusCode: 500, 
            message: 'Error fetching todos',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

todoRouter.get("/todos/:id", idValidator, errorHandler, async (req, res) => {
    const todo = await getTodo(req.headers.userid, req.params.id);
    if (todo?.statusCode) {
        return res.status(todo?.statusCode).send({statusCode: todo?.statusCode, message: todo?.message});
    }
    return res.status(200).send({statusCode: 200, data: todo});
});

todoRouter.post("/todos", taskValidator, statusValidator, errorHandler, async (req, res) => {
    const todo = await insertTodo({...req.body, userId: req.headers.userid});
    if (todo?.statusCode) {
        return res.status(todo?.statusCode).send({statusCode: todo?.statusCode, message: todo?.message});
    }
    return res.status(200).send({statusCode: 200, data: todo});
});

todoRouter.patch("/todos/:id", idValidator, taskValidator, statusValidator, errorHandler, async (req, res) => {
    const todo = await updateTodo({...req.body, taskId: req.params.id, userId: req.headers.userid});
    if (todo?.statusCode) {
        return res.status(todo?.statusCode).send({statusCode: todo?.statusCode, message: todo?.message});
    }
    return res.status(200).send({statusCode: 200, data: todo});
});

todoRouter.delete("/todos/:id", idValidator, errorHandler, async (req, res) => {
    const todo = await deleteTodo({taskId: req.params.id, userId: req.headers.userid});
    if (todo?.statusCode) {
        return res.status(todo?.statusCode).send({statusCode: todo?.statusCode, message: todo?.message});
    }
    return res.status(200).send({statusCode: 200, data: todo});
});

export default todoRouter;