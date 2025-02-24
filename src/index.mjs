import express from 'express';
import {apiGatewayHandler, authValidator, corsHandler, logger, verifyToken} from "./utils/middlewares.mjs";
import todoRouter from "./routes/todo.mjs";
import serverless from 'serverless-http';


// Create Express app
const app = express();


app.use(express.json());
// app.use(apiGatewayHandler);
app.use(corsHandler);
app.use(verifyToken)
app.use(authValidator);
app.use(logger)

app.get("/prod/api/v1/health-check", (req, res) => {
  res.status(200).send('Working');
});


app.use('/prod/api/v1', todoRouter);



// Export the serverless handler for Lambda
export const handler = serverless(app);

if (process.env.AWS_EXECUTION_ENV === undefined) {
  const startServer = async () => {
    try {
      const port = process.env.PORT || 3000;
      app.listen(port, () => console.log(`App listening on port ${port}`));
    } catch (error) {
      console.error('Failed to start server:', error);
    }
  };

  startServer().catch(err => console.error('Server startup error:', err));
}