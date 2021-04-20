import jwt from "jsonwebtoken";

const JWT_SECRET_KEY: any = process.env.JWT_SECRET;

export interface User {
  id: string;
  fullname: string;
}

export const sign = (user: User) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: user.id,
        fullname: user.fullname,
      },
      JWT_SECRET_KEY,
      (err: any, token: any) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
};

export const verify = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, (err: any, decoded: any) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};
