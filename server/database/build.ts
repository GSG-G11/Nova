/* eslint-disable import/extensions */
// import mongoose from 'mongoose';
import dotenv from 'dotenv';
import startDb from './config';
import userSchema from './models/user';
import Users from './fakeData/Users.json';
import Interviewees from './fakeData/Interviewees.json';
import Interviewers from './fakeData/Interviewers.json';
import Schedule from './fakeData/Schedule.json';
import intervieweeSchema from './models/interviewee';
import interviewerSchema from './models/interviewer';
import scheduleSchema from './models/schedule';

dotenv.config();

startDb();

Users.user.forEach((user) => {
  userSchema.create(user);
});

Schedule.schedule.forEach((schedule) => {
  scheduleSchema.create(schedule);
});

Interviewees.interviewee.forEach((interviewee) => {
  intervieweeSchema.create(interviewee);
});

Interviewers.interviewer.forEach((interviewer) => {
  interviewerSchema.create(interviewer);
});

// TODO: End connection
// mongoose.connection.close();
