/* eslint-disable import/extensions */
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

const createFakeData = async () => {
  try {
    Users.user.forEach(async (user) => {
      await userSchema.create(user);
    });

    Schedule.schedule.forEach(async (schedule) => {
      await scheduleSchema.create(schedule);
    });

    Interviewees.interviewee.forEach(async (interviewee) => {
      await intervieweeSchema.create(interviewee);
    });

    Interviewers.interviewer.forEach(async (interviewer) => {
      await interviewerSchema.create(interviewer);
    });

    console.log('Fake data created successfully');
  } catch (err) {
    console.log(err);
  }
};

startDb().then(async () => {
  await createFakeData();
});
