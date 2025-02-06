import express from 'express';
import appRouter from "./routes/index.mjs";
import {fetchParam} from "./db/config.mjs";


const app = express();

app.use(express.json());
app.use(appRouter);


const startServer = async () => {
    const port = await fetchParam('PORT');
    app.listen(port, () => console.log(`App listening on port ${port}`));
};

startServer().then();
