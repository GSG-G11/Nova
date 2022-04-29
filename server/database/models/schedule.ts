import { Schema, model } from 'mongoose';

const schedule = new Schema({
  languages: {
    type: String,
    required: false,
  },
  specialization: {
    type: String,
    required: false,
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
        name: {
          type: String,
          required: true,
        },
      },
    ],
    required: false,
  },

});

const scheduleSchema = model('Schedule', schedule);

export default scheduleSchema;
