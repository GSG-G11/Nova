/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import startDb from './config';
import usersData from './fakeData/Users.json';
import intervieweesData from './fakeData/Interviewees.json';
import interviewersData from './fakeData/Interviewers.json';
import scheduleData from './fakeData/Schedule.json';
import User from './models/user';
import Interviewee from './models/interviewee';
import Interviewer from './models/interviewer';
import Schedule from './models/schedule';

dotenv.config();

const createFakeData = async () => {
  try {
    usersData.user.forEach(async (user) => {
      await User.create(user);
    });

    scheduleData.schedule.forEach(async (schedule) => {
      await Schedule.create(schedule);
    });

    intervieweesData.interviewee.forEach(async (interviewee) => {
      await Interviewee.create(interviewee);
    });

    interviewersData.interviewer.forEach(async (interviewer) => {
      await Interviewer.create(interviewer);
    });

    console.log('Fake data created successfully');
  } catch (err) {
    console.log(err);
  }
};

startDb().then(async () => {
  await createFakeData();
});
