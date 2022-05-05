import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined');
}

const verifyToken = (token: string) => new Promise((resolve, reject) => {
  jwt.verify(token, SECRET_KEY, (err, decode) => {
    if (err) {
      reject(err);
    } else {
      resolve(decode);
    }
  });
});

const signToken = (payload:string) => new Promise((resolve, reject) => {
  jwt.sign(payload, SECRET_KEY, (err, token) => {
    if (err) {
      reject(err);
    } else {
      resolve(token);
    }
  });
});

export {
  verifyToken,
  signToken,
};
