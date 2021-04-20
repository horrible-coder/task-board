import bcrypt from "bcrypt";
const SALT_ROUNDS: number = 10;

export const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
};

export const comparePassword = (enteredPassword: string, hash: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(enteredPassword, hash, (err, match) => {
      if (err) reject(err);
      else resolve(match);
    });
  });
};
