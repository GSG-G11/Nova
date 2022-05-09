import { JwtPayload, sign, verify } from 'jsonwebtoken';

declare const process: {
  env: {
    JWT_SECRET: string;
  };
};

const { JWT_SECRET } = process.env;

const verifyToken = (token: string) => new Promise((resolve, reject) => {
  verify(token, JWT_SECRET, (err, decode) => {
    if (err) {
      reject(err);
    } else {
      resolve(decode);
    }
  });
});

const signToken = (
  payload: JwtPayload,
  options?: any,
) => new Promise((resolve, reject) => {
  sign(payload, JWT_SECRET, options, (err: any, token: any) => {
    if (err) {
      reject(err);
    }
    resolve(token);
  });
});

export {
  verifyToken,
  signToken,
};
