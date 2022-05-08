"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkAuth = (req, res) => {
    const { userInfo } = req;
    res.json({ data: userInfo });
};
exports.default = checkAuth;
