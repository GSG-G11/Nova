"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const User_1 = __importDefault(require("../../database/Models/User"));
const utils_1 = require("../../utils");
const login = async (req, res) => {
    const { email, password } = req.body;
    await (0, utils_1.loginValidation)(req.body);
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new utils_1.CustomError('User not found', 404);
    }
    const validPassword = await (0, bcrypt_1.compare)(password, user.password);
    if (!validPassword) {
        throw new utils_1.CustomError('Invalid password', 400);
    }
    const { id, role, is_verified: isVerified } = user;
    if (!isVerified) {
        throw new utils_1.CustomError('Please Verify your email', 401);
    }
    const payload = {
        id,
        isVerified,
        role,
    };
    const token = await (0, utils_1.signToken)(payload);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
    });
    return res.json({
        message: 'Login successful',
        data: {
            user: {
                id,
                isVerified,
                role,
            },
        },
    });
};
exports.default = login;
