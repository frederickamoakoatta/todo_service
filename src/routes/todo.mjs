import {Router} from "express";
import {prefix} from "../utils/constants.mjs";
const todoRouter = Router();

todoRouter.use(prefix, todoRouter);

todoRouter.get("/todos", async (req, res) => {
    res.status(200).send({todos: 'works'});
});

todoRouter.get("/todos/:id", async (req, res) => {

});

todoRouter.post("/todos", async (req, res) => {

});

todoRouter.patch("/todos:id", async (req, res) => {

});

todoRouter.delete("/todos:id", async (req, res) => {

});

export default todoRouter;