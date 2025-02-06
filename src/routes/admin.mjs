import {Router} from "express";
import todoRouter from "./todo.mjs";

const adminRouter = Router();

adminRouter.use('/api/v1/admin/', adminRouter);

export default adminRouter;