import { Response } from 'express';
import { ObjectId } from 'mongodb';
import Interviewee from '../../database/Models/Interviewee';
import User from '../../database/Models/User';
import {
  CustomError, mailSender, RequestType, emailTemplate, interviewValidation,
} from '../../utils';
import Schedule from '../../database/Models/Schedule';
import Interviewer from '../../database/Models/Interviewer';
import createMeeting from '../../zoom/createMeeting';

const createInterview = async (req: RequestType, res: Response) => {
  const id = req.userInfo?.id;
  // Validate the incoming request
  const {
    interviewerId, date, language, specialization, questionCategory, time,
  } : any = await interviewValidation(req.body);

  // Get the interviewee and interviewer emails
  const [{ email: intervieweeEmail },
    { email: interviewerEmail },
    interviewersSchedule] : any = await Promise
      .all([User.findById(id), User.findById(interviewerId), Schedule.aggregate([{
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
  // eslint-disable-next-line prefer-const
  let { join_url: finalUrl, password, meetingId } = await createMeeting();
  finalUrl += '?role=1';
  if (!finalUrl || !password || !meetingId) {
    throw new CustomError('Something went wrong', 500);
  }

  // generate a random mongo id
  const interviewId = new ObjectId();
  const interview = {
    _id: interviewId,
    interviewerId,
    date,
    time,
    language,
    specialization,
    questionCategory,
    meeting: {
      join_url: finalUrl,
      password,
      meetingId,
    },
  };

  const interviewerInterview = {
    _id: interviewId,
    intervieweeId: id,
    date,
    time,
    language,
    specialization,
    questionCategory,
    meeting: {
      join_url: finalUrl,
      password,
      meetingId,
    },
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
    Interviewee.findOneAndUpdate(
      { userId: id },
      {
        $push: {
          interviews: interview,
        },
      },
      {
        new: true,
      },
    ),
    //   // Update interviewer interviews
    Interviewer.findOneAndUpdate({ userId: interviewerId }, {
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
        finalUrl,
        password,
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
        finalUrl,
        password,
      ),
    ),

  ]);

  // Return the interviewee interview
  res.status(201).json({
    message: 'Interview created successfully',
    data: {
      interview,
    },
  });
};

export default createInterview;
