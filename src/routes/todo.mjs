import {Router} from "express";
import {deleteTodo, getTodo, getTodos, insertTodo, updateTodo} from "../db/todo-queries.mjs";

const todoRouter = Router();

todoRouter.use('/api/v1/', todoRouter);

todoRouter.get("/todos", async (req, res) => {
    const todos = await getTodos(req.headers.userid);
    if (todos?.statusCode)
        res.status(todos?.statusCode).send({statusCode: todos?.statusCode, message: todos?.message});
    res.status(200).send({statusCode: 200, data: todos});
});

todoRouter.get("/todos/:id", async (req, res) => {
    const todo = await getTodo(req.headers.userid, req.params.id);
    if (todo?.statusCode)
        res.status(todo?.statusCode).send({statusCode: todo?.statusCode, message: todo?.message});
    res.status(200).send({statusCode: 200, data: todo});
});

todoRouter.post("/todos", async (req, res) => {
    const todo = await insertTodo({...req.body, userId: req.headers.userid});
    if (todo?.statusCode)
        res.status(todo?.statusCode).send({statusCode: todo?.statusCode, message: todo?.message});
    res.status(200).send({statusCode: 200, data: todo});
});

todoRouter.patch("/todos/:id", async (req, res) => {
    const todo = await updateTodo({...req.body, taskId: req.params.id, userId: req.headers.userid});
    if (todo?.statusCode)
        res.status(todo?.statusCode).send({statusCode: todo?.statusCode, message: todo?.message});
    res.status(200).send({statusCode: 200, data: todo});
});

todoRouter.delete("/todos/:id", async (req, res) => {
    const todo = await deleteTodo({taskId: req.params.id, userId: req.headers.userid});
    if (todo?.statusCode)
        res.status(todo?.statusCode).send({statusCode: todo?.statusCode, message: todo?.message});
    res.status(200).send({statusCode: 200, data: todo});
});

export default todoRouter;