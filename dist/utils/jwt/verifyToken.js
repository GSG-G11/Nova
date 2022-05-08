"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { verify } = require('jsonwebtoken');
const verfiyToken = (token) => new Promise((resolve, reject) => {
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            reject(err);
        else {
            resolve(decoded);
        }
    });
});
exports.default = verfiyToken;
