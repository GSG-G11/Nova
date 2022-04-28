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

const intervieweeSchema = model('Interviewee', interviewee);

export default intervieweeSchema;
