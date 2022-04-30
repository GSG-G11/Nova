/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import startDb from './config';
import usersData from './fakeData/Users.json';
import intervieweesData from './fakeData/Interviewees.json';
import interviewersData from './fakeData/Interviewers.json';
import scheduleData from './fakeData/Schedule.json';
import User from './models/user';
import Interviewee from './models/interviewee';
import Interviewer from './models/interviewer';
import Schedule from './models/schedule';

mongoose.deleteModel('User');
mongoose.deleteModel('Interviewee');
mongoose.deleteModel('Interviewer');
mongoose.deleteModel('Schedule');
const createFakeData: Function = () => {
  usersData.user.forEach((user) => {
    User.create(user);
  });

  scheduleData.schedule.forEach((schedule) => {
    Schedule.create(schedule);
  });

  intervieweesData.interviewee.forEach((interviewee) => {
    Interviewee.create(interviewee);
  });

  interviewersData.interviewer.forEach((interviewer) => {
    Interviewer.create(interviewer);
  });

  console.log('Fake data created successfully');
};

startDb().then(() => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    createFakeData();
  }
});
