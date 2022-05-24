import jwt from 'jsonwebtoken';
import { CustomError } from '../utils';

const rp = require('request-promise');

const payload = {
  iss: process.env.API_KEY,
  exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, process.env.API_SECRET ?? '');
const createMeeting = async () => {
  const email = process.env.EMAIL;
  const options = {
    method: 'POST',
    uri: `https://api.zoom.us/v2/users/${email}/meetings`,
    body: {
      topic: 'Meeting',
      type: 2,
      settings: {
        host_video: 'true',
        participant_video: 'true',
        join_before_host: 'true',
        approval_type: 1,
      },
      pre_schedule: 'true',
    },
    auth: {
      bearer: token,
    },
    headers: {
      'content-type': 'application/json',
      'User-Agent': 'Zoom-api-Jwt-Request',
    },
    json: true,
  };

  const response = await rp(options);
  if (!response) {
    throw new CustomError('Something went wrong', 500);
  }

  const { join_url: joinUrl, password, id } : any = response;

  const finalUrl = `${joinUrl.replaceAll('https://us05web.zoom.us/j/', 'http://localhost:9998/?')
  }?role=1`;
  console.log(finalUrl);
  const dataRes = {
    join_url: finalUrl,
    password,
    meetingId: id,
  };

  return dataRes;
};

export default createMeeting;
