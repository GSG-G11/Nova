"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const errorHandler_1 = __importDefault(require("./errorHandler"));
exports.errorHandler = errorHandler_1.default;
const notFound_1 = __importDefault(require("./notFound"));
exports.notFound = notFound_1.default;
