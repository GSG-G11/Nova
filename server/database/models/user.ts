import { Schema, model } from 'mongoose';

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cv: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  profile_picture: {
    type: String,
    required: false,
  },
  level: {
    type: Number,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
});

const userSchema = model('user', user);

export default userSchema;
