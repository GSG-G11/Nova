import { Schema, model } from 'mongoose';

const interviewer = new Schema({
  userId: {
    $ref: 'User',
    type: String,
    required: true,
  },
  languages: {
    type: Array,
    required: true,
  },
  specialization: {
    type: String,
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
          required: true,
        },
        specialization: {
          type: String,
          required: true,
        },
        questionCategory: {
          type: Array,
          required: true,
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
          type: Number,
          required: true,
        },
      },
    ],
    required: false,
  },

});

const interviewerSchema = model('Interviewer', interviewer);

export default interviewerSchema;
