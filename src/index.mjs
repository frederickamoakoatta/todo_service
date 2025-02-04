import express from 'express';
import {port} from "./utils/constants.mjs";
import todoRouter from "./routes/todo.mjs"

const app = express();

app.use(express.json());
app.use(todoRouter)

app.listen(port, () => console.log(`App listening on port ${port}`));