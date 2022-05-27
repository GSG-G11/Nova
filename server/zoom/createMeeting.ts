// import jwt from 'jsonwebtoken';
// import { CustomError } from '../utils';

// const rp = require('request-promise');

// const payload = {
//   iss: process.env.API_KEY,
//   exp: new Date().getTime() + 5000,
// };
// const token = jwt.sign(payload, process.env.API_SECRET ?? '');
// const createMeeting = async () => {
//   const email = process.env.EMAIL;
//   const options = {
//     method: 'POST',
//     uri: `https://api.zoom.us/v2/users/${email}/meetings`,
//     body: {
//       topic: 'Meeting',
//       type: 2,
//       settings: {
//         host_video: 'true',
//         participant_video: 'true',
//         approval_type: 2,
//       },
//     },
//     auth: {
//       bearer: token,
//     },
//     headers: {
//       'content-type': 'application/json',
//       'User-Agent': 'Zoom-api-Jwt-Request',
//     },
//     json: true,
//   };

//   const response = await rp(options);
//   if (!response) {
//     throw new CustomError('Something went wrong', 500);
//   }

//   const { join_url: joinUrl, password, id } : any = response;

//   console.log(response);
//   const finalUrl = joinUrl.replaceAll('https://us05web.zoom.us/j/', 'http://localhost:9998/?');
//   console.log(finalUrl);
//   const dataRes = {
//     join_url: finalUrl,
//     password,
//     meetingId: id,
//   };

//   return dataRes;
// };

// export default createMeeting;

import axios from 'axios';
import jwt from 'jsonwebtoken';
import { CustomError } from '../utils';

const rp = require('request-promise');

// const payload = {
//   iss: process.env.API_KEY,
//   exp: new Date().getTime() + 5000,
// };
const createMeeting = async () => {
  const meetingObject = {
    meetingNumber: Math.floor(Math.random() * 100000000),
    userName: `User ${Math.floor(Math.random() * 100000000)}`,
    apiKey: process.env.API_KEY,
    passWord: '12345678',
    success: (success: any) => {
      console.log(success);
    },
    error: (error: any) => {
      console.log(error);
    },
  };
  const request = await axios.post('https://zoomnova.herokuapp.com/', {
    meetingNumber: meetingObject.meetingNumber,
    role: 0,
  });

  return {
    ...meetingObject,
    signature: request.data.signature,
  };
};

export default createMeeting;
