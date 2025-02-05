import express from 'express';
import 'dotenv/config';
import {port} from "./utils/constants.mjs";
import appRouter from "./routes/index.mjs";
import testDB from "./db/queries.mjs";

const app = express();

app.use(express.json());
app.use(appRouter);

testDB().then();

app.listen(port, () => console.log(`App listening on port ${port}`));