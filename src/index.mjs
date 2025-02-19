import express from 'express';
import {authValidator, logger, verifyToken} from "./utils/middlewares.mjs";
import todoRouter from "./routes/todo.mjs";
import cors from "cors";
import {fetchParam} from "./utils/util.mjs";
import serverless from 'serverless-http';


// Create Express app
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

// Export the serverless handler for Lambda
export const handler = serverless(app);

// Only start the server when running locally (not in Lambda)
if (process.env.AWS_EXECUTION_ENV === undefined) {
  const startServer = async () => {
    try {
      const port = await fetchParam('PORT') || 3000;
      app.listen(port, () => console.log(`App listening on port ${port}`));
    } catch (error) {
      console.error('Failed to start server:', error);
    }
  };

  startServer().catch(err => console.error('Server startup error:', err));
}