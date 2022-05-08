"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/login', controllers_1.login);
router.get('/users/checkAuth', auth_1.userAuth, controllers_1.checkAuth);
exports.default = router;
