import { Response } from 'express';
import Interviewee from '../../database/Models/Interviewee';
import User from '../../database/Models/User';
import { CustomError, mailSender, RequestType } from '../../utils';
import interviewValidation from '../../utils/validation/interviewValidation';
import emailTemplate from '../../utils/email/interviewEmailTemplate';
import Schedule from '../../database/Models/Schedule';
import Interviewer from '../../database/Models/Interviewer';

const createInterview = async (req: RequestType, res: Response) => {
  const id = req.userInfo?.id;
  const {
    interviewerId, date, time, language, specialization, questionCategory,
  } = req.body;

  // Validate the incoming request
  await interviewValidation(req.body);

  // Get the interviewee and interviewer emails
  const [{ email: intervieweeEmail }, { email: interviewerEmail }] : any = await Promise
    .all([await User.findById(id), await User.findById(interviewerId)]);

  // Get Available interviewers schedule
  const interviewersSchedule = await Schedule.aggregate([{
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
      'available.interviewerId': '2',
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

  ]);

  // Check if the interviewer is available on the date and time
  const filteredDateSchedule = interviewersSchedule.filter((x) => {
    const dateConvert = new Date(x.timeSlot.date).toISOString().split('T')[0];
    return dateConvert === date;
  });

  if (filteredDateSchedule.length === 0) {
    throw new CustomError('Interviewer is not available on this date', 400);
  }
  const { timeSlot: { time: freeTime } } : any = filteredDateSchedule[0];

  if (!freeTime.includes(time)) {
    throw new CustomError('Interviewer is not available on this time', 400);
  }

  // remove the time from the available time
  const indexOfScheduleFreeTime = freeTime.indexOf(time);
  const newScheduleTimes = freeTime.filter((_: any, i: any) => i !== indexOfScheduleFreeTime);

  // update the schedule for the interviewer
  await Schedule.updateOne({
    'available.date': date,
    'available.time': time,

  }, {
    $set: {
      'available.$.time': newScheduleTimes,
    },
  });

  const interview = {
    interviewerId,
    date,
    time,
    language,
    specialization,
    questionCategory,
  };

  const interviewerInterview = {
    intervieweeId: id,
    date,
    time,
    language,
    specialization,
    questionCategory,
  };

  // Update interviewee interviews
  await Interviewee.findOneAndUpdate({
    where: {
      userId: id,
    },
  }, {
    $push: {
      interviews: interview,
    },
  }, {
    new: true,
  });

  // Update interviewer interviews
  await Interviewer.findByIdAndUpdate(interviewerId, {
    $push: {
      interviews: interviewerInterview,
    },
  }, {
    new: true,
  });

  // Find the date in interviewer  and update the time in it

  const findDateQuery: any = [
    {
      $unwind: '$schedule',
    }, {
      $match: {
        'schedule.date': {
          $eq: new Date(date),
        },
      },
    },
    {
      $project: {
        _id: 0,
        'schedule.date': 1,
        'schedule.time': 1,
      },
    },
  ];

  const findDate = await Interviewer.aggregate(findDateQuery);
  const updateTimeAvailable = findDate[0].schedule.time;
  const indexOfTime = updateTimeAvailable.indexOf(time);
  const newTime = updateTimeAvailable.filter((_: any, i: any) => i !== indexOfTime);

  await Interviewer.updateOne({
    'schedule.time': time,
  }, {
    $set: {
      'schedule.$.time': newTime,
    },
  });

  console.log(newTime);

  // Send Emails to both interviewee and interviewer

  mailSender(interviewerEmail, 'Interview Request', emailTemplate(date, time, language, specialization, questionCategory, intervieweeEmail));

  mailSender(intervieweeEmail, 'Interview Request', emailTemplate(date, time, language, specialization, questionCategory));

  // Return the interviewee interview
  res.status(201).json({
    message: 'Interview created successfully',
    data: {
      interview,
    },
  });
};

export default createInterview;
