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

// Delete a collection
const deleteCollection = async (model: any) => {
  try {
    await model.deleteMany({});
  } catch (err) {
    console.log(err);
  }
};

const createFakeData = async () => {
  try {
    usersData.user.forEach(async (user: object) => {
      await User.create(user);
    });

    scheduleData.schedule.forEach(async (schedule: object) => {
      await Schedule.create(schedule);
    });

    intervieweesData.interviewee.forEach(async (interviewee: object) => {
      await Interviewee.create(interviewee);
    });

    interviewersData.interviewer.forEach(async (interviewer: object) => {
      await Interviewer.create(interviewer);
    });

    console.log('Fake data created successfully');
  } catch (err: any) {
    throw new Error(err);
  }
};

const main = async () => {
  try {
    await startDb();
    await deleteCollection(User);
    await deleteCollection(Interviewee);
    await deleteCollection(Interviewer);
    await deleteCollection(Schedule);
    await createFakeData();

    setTimeout(() => {
      mongoose.connection.close();
    }, 1500);
  } catch (err: any) {
    throw new Error(err);
  }
};

main();
