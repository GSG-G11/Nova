"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schedule = new mongoose_1.Schema({
    languages: {
        type: String,
        required: false,
        enum: ['JS', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO'],
    },
    specialization: {
        type: String,
        required: false,
        enum: ['FRONTEND', 'BACKEND', 'DEVOPS', 'SECURITY', 'DATA STRUCTURE', 'FULL STACK'],
    },
    questionCategory: {
        type: String,
        required: false,
        enum: ['Technical', 'Analytical', 'Algorithms', 'System Design'],
    },
    available: {
        type: [
            {
                interviewerId: {
                    $ref: 'Interviewer',
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    required: true,
                },
                time: {
                    type: Array,
                    required: true,
                },
            },
        ],
        required: false,
    },
});
const Schedule = (0, mongoose_1.model)('Schedule', schedule);
exports.default = Schedule;
