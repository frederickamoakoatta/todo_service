import {Router} from "express";
import todoRouter from "./todo.mjs";
import adminRouter from "./admin.mjs";

const appRouter = Router();

appRouter.use(todoRouter);
appRouter.use(adminRouter);

export default appRouter;