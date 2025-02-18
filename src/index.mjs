import express from 'express';
import serverless from 'serverless-http';
import appRouter from "./routes/index.mjs";
import { fetchParam } from "./db/config.mjs";

// Create Express app
const app = express();

app.use(express.json());
app.use(appRouter);

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