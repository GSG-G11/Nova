import { Schema, model } from 'mongoose';

const interviewee = new Schema({
  userId: {
    $ref: 'User',
    type: Schema.Types.ObjectId,
    required: true,
  },
  interviews: {
    type: [
      {
        createdAt: {
          type: Date,
          default: Date.now,
        },
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
          enum: ['JAVASCRIPT', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO'],
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
        meeting: {
          type: {
            join_url: {
              type: String,
              required: true,
            },
            password: {
              type: String,
              required: true,
            },
            meetingId: {
              type: String,
              required: true,
            },
          },
          required: true,
          default: {
            join_url: '',
            password: '',
            meetingId: '',
          },
        },
        is_cancelled: {
          type: Boolean,
          default: false,
          required: true,
        },
        review: {
          type: {
            message: {
              type: String,
              required: false,
              default: '',
            },
            saved: {
              type: Boolean,
              required: false,
              default: false,
            },
            created_at: {
              type: Date,
              required: false,
            },
          },
          default: {
            message: '',
            saved: false,
            created_at: new Date(),
          },
        },
      },
    ],

    required: false,
    default: [],
  },

});

const Interviewee = model('Interviewee', interviewee);

export default Interviewee;
