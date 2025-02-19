import express from 'express';
import {authValidator, logger, verifyToken} from "./utils/middlewares.mjs";
import serverless from 'serverless-http';
import { fetchParam } from "./db/core.mjs";
import todoRouter from "./routes/todo.mjs";
import cors from "cors";
import {fetchParam} from "./utils/util.mjs";
import serverless from 'serverless-http';


// Create Express app
const app = express();

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`[DEBUG] Request: ${req.method} ${req.originalUrl}`);
  console.log(`[DEBUG] Path: ${req.path}`);
  console.log(`[DEBUG] Headers:`, JSON.stringify(req.headers));
  next();
});

app.use(express.json());

// Use a path normalizer middleware to handle stage prefixes from API Gateway
app.use((req, res, next) => {
  // Handle API Gateway stage prefixes (like /dev) by normalizing the path
  const path = req.path;
  const segments = path.split('/').filter(segment => segment);
  
  // If the first segment might be a stage name (dev, prod, etc.)
  if (segments[0] && ['dev', 'test', 'prod'].includes(segments[0])) {
    // Reconstruct URL without the stage name for routing purposes
    req.url = '/' + segments.slice(1).join('/');
    console.log(`[DEBUG] Normalized path from ${path} to ${req.url}`);
  }
  next();
});

// Apply auth middleware (spread it because it's an array)
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(verifyToken)
app.use(authValidator);

// Mount the router for todos
app.use(logger)
app.use('/api/v1', todoRouter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Test route
app.get('/api/v1/test', (req, res) => {
  res.status(200).json({ message: 'Test route works!' });
});

// Default route for 404s
app.use((req, res) => {
  console.log(`[DEBUG] Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    statusCode: 404, 
    message: `Route not found: ${req.method} ${req.path}` 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).json({
    statusCode: 500,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Export the serverless handler for Lambda
export const handler = serverless(app);

// Only start the server when running locally (not in Lambda)
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