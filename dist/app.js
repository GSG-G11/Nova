"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./database/config"));
const routes_1 = require("./routes");
const errors_1 = require("./middlewares/errors");
dotenv_1.default.config();
(0, config_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use('/api', routes_1.authRouter);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static((0, path_1.join)(__dirname, '..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile((0, path_1.join)(__dirname, '..', 'client', 'build', 'index.html'));
    });
}
app.use(errors_1.notFound);
app.use(errors_1.errorHandler);
exports.default = app;
