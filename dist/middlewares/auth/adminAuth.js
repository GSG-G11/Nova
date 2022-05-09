"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const adminAuth = (req, res, next) => {
    const { userInfo: { role } } = req;
    if (role === 'admin') {
        next();
    }
    else {
        throw new utils_1.CustomError('You are not authorized', 401);
    }
};
exports.default = adminAuth;
