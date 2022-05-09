"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let URL;
const { NODE_ENV, DEV_DATABASE_URL, DATABASE_URL, TEST_DATABASE_URL, } = process.env;
switch (NODE_ENV) {
    case 'development':
        URL = DEV_DATABASE_URL;
        break;
    case 'production':
        URL = DATABASE_URL;
        break;
    case 'test':
        URL = TEST_DATABASE_URL;
        break;
    default:
        throw new Error('NODE_ENV is not set');
}
async function startDb() {
    try {
        if (!URL) {
            throw new Error('DB_URL is not defined');
        }
        const db = await mongoose_1.default.connect(URL);
        console.log('Connected to DB');
        return db;
    }
    catch (error) {
        return error;
    }
}
exports.default = startDb;
