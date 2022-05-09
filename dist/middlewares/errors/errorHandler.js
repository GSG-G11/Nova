"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: error.message,
        });
    }
    const status = error.code || 500;
    const message = error.message || 'Something went wrong';
    return res.status(status).send({
        status,
        message,
    });
};
exports.default = errorHandler;
