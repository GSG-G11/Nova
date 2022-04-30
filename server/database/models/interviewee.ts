import { Schema, model } from 'mongoose';

const interviewee = new Schema({
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
          type: [String],
          enum: ['JS', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO'],
          required: true,
        },
        specialization: {
          type: [String],
          enum: ['FRONTEND', 'BACKEND', 'DEVOPS', 'SECURITY', 'DATA STRUCTURE', 'FULL STACK'],
          required: true,
        },
        questionCategory: {
          type: [String],
          enum: ['Technical', 'Behavioural'],
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

const Interviewee = model('Interviewee', interviewee);

export default Interviewee;
