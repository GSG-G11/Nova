"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const interviewer = new mongoose_1.Schema({
    userId: {
        $ref: 'User',
        type: String,
        required: true,
    },
    languages: {
        type: [String],
        enum: ['JS', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO'],
        required: true,
    },
    specialization: {
        type: [String],
        enum: ['FRONTEND', 'BACKEND', 'DEVOPS', 'SECURITY', 'DATA STRUCTURE', 'FULL STACK'],
        required: true,
    },
    interviews: {
        type: [
            {
                intervieweeId: {
                    $ref: 'Interviewee',
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    required: true,
                },
                time: {
                    type: Number,
                    required: true,
                },
                language: {
                    type: String,
                    enum: ['JS', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO'],
                    required: true,
                },
                specialization: {
                    type: String,
                    enum: ['FRONTEND', 'BACKEND', 'DEVOPS', 'SECURITY', 'DATA STRUCTURE', 'FULL STACK'],
                    required: true,
                },
                questionCategory: {
                    type: String,
                    required: true,
                    enum: ['Technical', 'Analytical', 'Algorithms', 'System Design'],
                },
            },
        ],
        required: false,
    },
    schedule: {
        type: [
            {
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
const Interviewer = (0, mongoose_1.model)('Interviewer', interviewer);
exports.default = Interviewer;
