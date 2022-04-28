import { Schema, model } from 'mongoose';

const interviewee = new Schema({
  userId: {
    type: String,
    required: true,
  },
  interviews: {
    type: [
      {
        interviewerId: {
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

const intervieweeSchema = model('interviewee', interviewee);

export default intervieweeSchema;
