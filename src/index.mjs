import express from 'express';
import {authValidator, logger, verifyToken} from "./utils/middlewares.mjs";
import todoRouter from "./routes/todo.mjs";
import cors from "cors";
import {fetchParam} from "./utils/util.mjs";


const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(verifyToken)
app.use(authValidator);
app.use(logger)
app.use(todoRouter);


const startServer = async () => {
    const port = await fetchParam('PORT');
    app.listen(port, () => console.log(`App listening on port ${port}`));
};

startServer().then();
