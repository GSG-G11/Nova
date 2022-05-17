import { Response } from 'express';
import GoogleMeet from 'google-meet-api';
import Interviewee from '../../database/Models/Interviewee';
import User from '../../database/Models/User';
import {
  CustomError, mailSender, RequestType, emailTemplate, interviewValidation,
} from '../../utils';
import Schedule from '../../database/Models/Schedule';
import Interviewer from '../../database/Models/Interviewer';

const Meeting = GoogleMeet.meet;
const createInterview = async (req: RequestType, res: Response) => {
  const id = req.userInfo?.id;
  // Validate the incoming request
  const {
    interviewerId, date, language, specialization, questionCategory, time,
  } : any = await interviewValidation(req.body);

  // Get the interviewee and interviewer emails and Meet Link
  const [meetingLink, { email: intervieweeEmail },
    { email: interviewerEmail },
    interviewersSchedule] : any = await Promise
      .all([
        // Get Google Meet Link
        Meeting({
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          date: date.toISOString().slice(0, 10),
          time: time.length === 1 ? `0${time}:00` : `${time}:00`,
          summary: 'Interview',
          location: 'Online',
          description: 'Interview',
        }),
        User.findById(id), User.findById(interviewerId), Schedule.aggregate([{
          $project: {
            _id: 0,
            'available.date': 1,
            'available.time': 1,
            'available.interviewerId': 1,
          },
        }, {
          $unwind: '$available',
        },
        {
          $match: {
            'available.interviewerId': interviewerId,
            'available.date': new Date(date),
          },
        }, {
          $group: {
            _id: '$available.date',
            timeSlot: {
              $first: {
                time: '$available.time',
                date: '$available.date',
              },

            },
          },
        },

        ])]);

  if (interviewersSchedule.length === 0) {
    throw new CustomError('Interviewer is not available on this date', 400);
  }
  const { timeSlot: { time: freeTime } } : any = interviewersSchedule[0];

  if (!freeTime.includes(time)) {
    throw new CustomError('Interviewer is not available on this time', 400);
  }

  // // remove the time from the available time
  const indexOfScheduleFreeTime = freeTime.indexOf(time);
  const newScheduleTimes = freeTime.filter((_: any, i: any) => i !== indexOfScheduleFreeTime);

  // // update the schedule for the interviewer
  const interview = {
    interviewerId,
    date,
    time,
    language,
    specialization,
    questionCategory,
    meetingLink,
  };

  const interviewerInterview = {
    intervieweeId: id,
    date,
    time,
    language,
    specialization,
    questionCategory,
    meetingLink,
  };

  await Promise.all([
    Schedule.updateOne({
      'available.date': date,
      'available.time': time,

    }, {
      $set: {
        'available.$.time': newScheduleTimes,
      },
    }),
    //   // Update interviewee interviews
    Interviewee.findOneAndUpdate({
      where: {
        userId: id,
      },
    }, {
      $push: {
        interviews: interview,
      },
    }, {
      new: true,
    }),
    //   // Update interviewer interviews
    Interviewer.findByIdAndUpdate(interviewerId, {
      $push: {
        interviews: interviewerInterview,
      },
    }, {
      new: true,
    }),
    Interviewer.updateOne({
      'schedule.time': time,
    }, {
      $set: {
        'schedule.$.time': newScheduleTimes,
      },
    }),
    //   // Send Emails to both interviewee and interviewer

    mailSender(
      interviewerEmail,
      'Interview Request',
      emailTemplate(
        date,
        time,
        language,
        specialization,
        questionCategory,
        intervieweeEmail,
      ),
    ),

    mailSender(
      intervieweeEmail,
      'Interview Request',
      emailTemplate(
        date,
        time,
        language,
        specialization,
        questionCategory,
      ),
    ),

  ]);

  // Return the interviewee interview
  res.status(201).json({
    message: 'Interview created successfully',
    data: {
      interview,
      meetingLink,
    },
  });
};

export default createInterview;
