import { Schema, model } from 'mongoose';

const interviewer = new Schema({
  userId: {
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
          type: String,
          required: true,
        },
        date: {
          type: Number,
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
          type: Number,
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

const interviewerSchema = model('interviewer', interviewer);

export default interviewerSchema;
