import { JwtPayload, sign } from 'jsonwebtoken';

const signToken = (
  payload: JwtPayload,
  secret: string,
  options: any,
) => new Promise((resolve, reject) => {
  sign(payload, secret, options, (err: any, token: any) => {
    if (err) {
      reject(err);
    }
    resolve(token);
  });
});

export default signToken;
