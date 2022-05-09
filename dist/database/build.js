"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const users_json_1 = __importDefault(require("./fakeData/users.json"));
const interviewees_json_1 = __importDefault(require("./fakeData/interviewees.json"));
const interviewers_json_1 = __importDefault(require("./fakeData/interviewers.json"));
const schedule_json_1 = __importDefault(require("./fakeData/schedule.json"));
const User_1 = __importDefault(require("./Models/User"));
const Interviewee_1 = __importDefault(require("./Models/Interviewee"));
const Interviewer_1 = __importDefault(require("./Models/Interviewer"));
const Schedule_1 = __importDefault(require("./Models/Schedule"));
const createFakeData = async () => {
    try {
        await (0, config_1.default)();
        users_json_1.default.user.forEach(async (user) => {
            await User_1.default.deleteMany({});
            await User_1.default.create(user);
        });
        schedule_json_1.default.schedule.forEach(async (schedule) => {
            await Schedule_1.default.deleteMany({});
            await Schedule_1.default.create(schedule);
        });
        interviewees_json_1.default.interviewee.forEach(async (interviewee) => {
            await Interviewee_1.default.deleteMany({});
            await Interviewee_1.default.create(interviewee);
        });
        interviewers_json_1.default.interviewer.forEach(async (interviewer) => {
            await Interviewer_1.default.deleteMany({});
            await Interviewer_1.default.create(interviewer);
        });
        setTimeout(() => {
            mongoose_1.default.connection.close();
        }, 1500);
        console.log('Fake data created successfully');
    }
    catch (err) {
        throw new Error(err);
    }
};
if (process.env.NODE_ENV === 'development') {
    createFakeData();
}
