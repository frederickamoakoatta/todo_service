import {header, body, param, validationResult} from "express-validator"

const logger = (req, res) => {
    //TODO : Build a cloudwatch utility function, register on all routes for req and error res
}

const errorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({statusCode: 400, errors: errors.array()});
    }
    next();
};

const authValidator = [
    //TODO : Add validation for access key here as well
    header('userId')
        .exists().withMessage('user_id is required in headers')
        .isString().withMessage('user_id must be a string')
        .notEmpty().withMessage('user_id cannot be empty'),
];

const taskValidator = body('tasks')
        .exists().withMessage('tasks is required in request')
        .isString().withMessage('tasks must be a string')
        .notEmpty().withMessage('tasks cannot be empty');

const statusValidator = body('completed')
        .exists().withMessage('completed is required in request')
        .isBoolean().withMessage('completed must be a boolean value')
        .notEmpty().withMessage('completed cannot be empty')


const idValidator = param('id')
        .exists().withMessage('task id is required in path parameter');


export {errorHandler, authValidator, taskValidator, statusValidator, idValidator};