import mongoose from 'mongoose';
import startDb from './config';
import usersData from './fakeData/users.json';
import intervieweesData from './fakeData/interviewees.json';
import interviewersData from './fakeData/interviewers.json';
import scheduleData from './fakeData/schedule.json';
import User from './Models/User';
import Interviewee from './Models/Interviewee';
import Interviewer from './Models/Interviewer';
import Schedule from './Models/Schedule';

const createFakeData = async () => {
  try {
    await startDb();

    await Promise.all([
      User.deleteMany({}),
      Schedule.deleteMany({}),
      Interviewee.deleteMany({}),
      Interviewer.deleteMany({}),
    ]);

    await Promise.all([
      User.insertMany(usersData.user),
      Schedule.insertMany(scheduleData.schedule),
      Interviewee.insertMany(intervieweesData.interviewee),
      Interviewer.insertMany(interviewersData.interviewer),
    ]);

    await setTimeout(() => {
      mongoose.connection.close();
    }, 15000);

    console.log('Fake data created successfully');
  } catch (err: any) {
    throw new Error(err);
  }
};

if (process.env.NODE_ENV === 'development') {
  createFakeData();
}

export default createFakeData;
