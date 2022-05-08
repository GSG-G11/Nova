"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.checkAuth = void 0;
const login_1 = __importDefault(require("./auth/login"));
exports.login = login_1.default;
const checkAuth_1 = __importDefault(require("./auth/checkAuth"));
exports.checkAuth = checkAuth_1.default;
