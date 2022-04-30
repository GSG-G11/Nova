import jwt from 'jsonwebtoken';

const verifyToken = (token: string, secret: string) => new Promise((resolve, reject) => {
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      reject(err);
    } else {
      resolve(decode);
    }
  });
});

const signToken = (payload:string, secret:string) => new Promise((resolve, reject) => {
  jwt.sign(payload, secret, (err, token) => {
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
