import express from 'express';
import serverless from 'serverless-http';
import { fetchParam } from "./db/core.mjs";
import {authValidator} from "./utils/middlewares.mjs";
import todoRouter from "./routes/todo.mjs";

// Create Express app
const app = express();
app.use(express.json());
app.use(authValidator);
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