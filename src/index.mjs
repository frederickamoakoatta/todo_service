import express from 'express';
import {fetchParam} from "./db/core.mjs";
import {authValidator} from "./utils/middlewares.mjs";
import todoRouter from "./routes/todo.mjs";


const app = express();
app.use(express.json());
app.use(authValidator);
app.use(todoRouter);


const startServer = async () => {
    const port = await fetchParam('PORT');
    app.listen(port, () => console.log(`App listening on port ${port}`));
};

startServer().then();
