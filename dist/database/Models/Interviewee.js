"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const interviewee = new mongoose_1.Schema({
    userId: {
        $ref: 'User',
        type: String,
        required: true,
    },
    interviews: {
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
                    enum: ['Technical', 'Analytical', 'Algorithms', 'System Design'],
                    required: true,
                },
                review: {
                    type: {
                        message: {
                            type: String,
                            required: false,
                        },
                        saved: {
                            type: Boolean,
                            required: false,
                        },
                    },
                },
            },
        ],
        required: false,
    },
});
const Interviewee = (0, mongoose_1.model)('Interviewee', interviewee);
exports.default = Interviewee;
