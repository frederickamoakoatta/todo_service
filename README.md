# Todo Service

## Overview
The Todo Service is a RESTful API built with Express.js, AWS OAuth, AWS Amplify, AWS Parameter Store, and DynamoDB. It provides basic authentication and CRUD operations for managing todos. This service is designed for frontend developers who want to study and implement authentication and CRUD operations using an external REST API.

Obtain API keys to access the endpoints [here](https://todo-portal.vercel.app/).

## Features
- User authentication via AWS Cognito
- API key management via AWS Amplify
- Request logging and observability with AWS CloudWatch
- Secure parameter storage using AWS Parameter Store
- Scalable NoSQL storage with DynamoDB
- Fully tested API endpoints using Jest

## Routes
### Todo Management
| Method | Endpoint         | Description            | Authentication |
|--------|------------------|------------------------|---------------|
| GET    | `/todos`         | Retrieve all todos     | Required      |
| GET    | `/todos/:id`     | Retrieve a single todo | Required      |
| POST   | `/todos`         | Create a new todo      | Required      |
| PATCH  | `/todos/:id`     | Patch a new todo       | Required      |
| DELETE | `/todos/:id`     | Delete a todo          | Required      |

## Setup & Installation
### Prerequisites
- Node.js (>= 16.x)
- AWS Account
- AWS CLI configured with appropriate permissions

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/todo-service.git
   cd todo-service
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env`:
   ```sh
   AWS_REGION=your-region
   DYNAMO_DB_TABLE=todos-table
   PARAM_STORE_PATH=/your/param/store/path
   ```
4. Run the service:
   ```sh
   npm start
   ```
5. Run tests:
   ```sh
   npm test
   ```

## API Authentication
- Users must obtain an API key from the admin frontend.
- API requests must include the API key in the `Authorization` header:
  ```sh
  curl -H "Authorization: Bearer YOUR_API_KEY" https://api.yourservice.com/todos
  ```

## Deployment
- The service is designed to be deployed on AWS Lambda with API Gateway.
- Use AWS Amplify for frontend hosting and API key management.

## Future Improvements
- Rate limiting for API requests
- User roles and permissions
- Enhanced logging and monitoring

## License
This project is licensed under the MIT License.

