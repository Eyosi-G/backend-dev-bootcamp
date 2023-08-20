import jwt from "jsonwebtoken"

export const createToken = (payload, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, function (err, token) {
      if (err) return reject(err);
      resolve(`Bearer ${token}`);
    });
  });
};

export const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token.split(" ")[1], secret, function (err, decoded) {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};
