import express from 'express';
import 'dotenv/config';
import {port} from "./utils/constants.mjs";
import appRouter from "./routes/index.mjs";

const app = express();

app.use(express.json());
app.use(appRouter);


app.listen(port, () => console.log(`App listening on port ${port}`));