"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new utils_1.CustomError('Login First!', 401);
    }
    else {
        const userInfo = await (0, utils_1.verfiyToken)(token);
        if (userInfo.isVerified) {
            req.userInfo = userInfo;
            next();
        }
        else {
            throw new utils_1.CustomError('You need to verify your account!', 401);
        }
    }
};
exports.default = userAuth;
