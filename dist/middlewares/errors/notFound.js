"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-unused-vars
const notFound = (req, res, next) => {
    res.status(404).json({
        status: 404,
        message: 'Not found',
    });
};
exports.default = notFound;
