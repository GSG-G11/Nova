const { verify } = require('jsonwebtoken');

const verfiyToken = (token: string) => new Promise((resolve, reject) => {
  verify(token, process.env.JWT_SECRET, (err: Error, decoded: object) => {
    if (err) reject(err);
    else {
      resolve(decoded);
    }
  });
});

export default verfiyToken;