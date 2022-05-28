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
        approval_type: 2,
      },
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

  const dataRes = {
    join_url: joinUrl,
    password,
    meetingId: id,
  };

  return dataRes;
};

export default createMeeting;
