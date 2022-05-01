const jwt = require('jsonwebtoken');

const VerfiyAuth = (tokenKey: string) => new Promise((resolve, reject) => {
  jwt.verify(tokenKey, process.env.JWT_SECRET, (err: Error, decoded: object) => {
    if (err) reject(err);
    else {
      resolve(decoded);
    }
  });
});

module.exports = {
  VerfiyAuth,
};
