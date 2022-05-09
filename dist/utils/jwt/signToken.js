"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const signToken = (payload, options) => new Promise((resolve, reject) => {
    (0, jsonwebtoken_1.sign)(payload, JWT_SECRET, options, (err, token) => {
        if (err) {
            reject(err);
        }
        resolve(token);
    });
});
exports.default = signToken;
