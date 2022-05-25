import { Schema, model } from 'mongoose';

const schedule = new Schema({
  language: {
    type: String,
    required: false,
    enum: ['JAVASCRIPT', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO'],
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

const Schedule = model('Schedule', schedule);

export default Schedule;
