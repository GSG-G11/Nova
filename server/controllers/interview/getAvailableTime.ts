import { Response } from 'express';
import { RequestType, getInterviewTimeValidation } from '../../utils';

const getAvailableTime = async (req: RequestType, res: Response) => {
  const { specialization, language } : any = await getInterviewTimeValidation(req.body);

  console.log(specialization, language);

  res.send('getAvailableTime');
};

export default getAvailableTime;
