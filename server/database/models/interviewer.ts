import { Schema, model } from 'mongoose';

const interviewer = new Schema({
  userId: {
    $ref: 'User',
    type: String,
    required: true,
  },
  languages: {
    type: Array,
    enum: ['JS', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO'],
    required: true,
  },
  specialization: {
    type: String,
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
          type: Array,
          required: true,
          enum: ['Technical', 'Behavioural'],

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

const interviewerSchema = model('Interviewer', interviewer);

export default interviewerSchema;
