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
    usersData.user.forEach(async (user: object) => {
      await User.deleteMany({});
      await User.create(user);
    });

    scheduleData.schedule.forEach(async (schedule: object) => {
      await Schedule.deleteMany({});
      await Schedule.create(schedule);
    });

    intervieweesData.interviewee.forEach(async (interviewee: object) => {
      await Interviewee.deleteMany({});
      await Interviewee.create(interviewee);
    });

    interviewersData.interviewer.forEach(async (interviewer: object) => {
      await Interviewer.deleteMany({});
      await Interviewer.create(interviewer);
    });

    setTimeout(() => {
      mongoose.connection.close();
    }, 1500);

    console.log('Fake data created successfully');
  } catch (err: any) {
    throw new Error(err);
  }
};

if (process.env.NODE_ENV === 'development') {
  createFakeData();
}

export default createFakeData;
