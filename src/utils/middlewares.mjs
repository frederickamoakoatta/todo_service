import {header, body, param, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import {logEvent} from "./util.mjs";

const REGION = 'us-west-1';
const USER_POOL_ID = 'us-west-1_ZEPalthpD';
const ISSUER = `https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`;
const JWKS_URI = `${ISSUER}/.well-known/jwks.json`;

const client = jwksClient({
    jwksUri: JWKS_URI,
});

const logger = async (req, res, next) => {
    const message = `User ID ${req.headers.userid} made a ${req.method.toUpperCase()} request ${['POST', 'PATCH'].some((item) => item.toUpperCase() === req.method.toUpperCase()) ? `with req body of ${JSON.stringify(req.body)}` :``}`;
    await logEvent(message);
    next();
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


const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            return callback(err);
        }
        const signingKey = key?.getPublicKey();
        callback(null, signingKey);
    });
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, getKey, { issuer: ISSUER }, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        req.user = decoded;
        next();
    });
};


export {errorHandler, authValidator, taskValidator, statusValidator, idValidator, verifyToken, logger};