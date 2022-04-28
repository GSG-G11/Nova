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
        interviwerId: {
          type: String,
          required: true,
        },
        date: {
          type: Number,
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

const scheduleSchema = model('schedule', schedule);

export default scheduleSchema;
