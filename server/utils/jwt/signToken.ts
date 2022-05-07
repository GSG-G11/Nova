import { JwtPayload, sign } from 'jsonwebtoken';

declare const process: {
  env: {
    JWT_SECRET: string;
  };
};

const { JWT_SECRET } = process.env;

const signToken = (
  payload: JwtPayload,
  options: any,
) => new Promise((resolve, reject) => {
  sign(payload, JWT_SECRET, options, (err: any, token: any) => {
    if (err) {
      reject(err);
    }
    resolve(token);
  });
});

export default signToken;
