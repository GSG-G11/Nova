import { Response } from 'express';
import Schedule from '../../database/Models/Schedule';
import { RequestType, getInterviewTimeValidation } from '../../utils';

const getAvailableTime = async (req: RequestType, res: Response) => {
  const { specialization, language } : any = await getInterviewTimeValidation(req.body);

  const availableTime = await Schedule.find({ specialization, language });

  const { available } = availableTime[0] || { available: [] };

  res.json({
    message: 'Success',
    data: available,
  });
};

export default getAvailableTime;
