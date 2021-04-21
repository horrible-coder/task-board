import Users from "../models/users";
import { sign } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";

export const createUser = async (req: any, res: any) => {
  const body: any = req.body;
  console.log(body);
  if (!body.email) throw new Error("Provide an email.");
  if (!body.password) throw new Error("Provide a password.");
  if (!body.fullname) throw new Error("Provide your full name.");

  const existing = await Users.findOne({ where: { email: body.email } });
  if (existing) throw new Error("Email already exists. Provide another email.");

  await Users.create({
    email: body.email,
    password: await hashPassword(body.password),
    fullname: body.fullname,
  })
    .then(() => {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    })
    .catch((error) => {
      throw error;
    });
};

export const loginUser = async (req: any, res: any) => {
  const body = req.body;
  if (!body.email) throw new Error("Provide an email.");
  if (!body.password) throw new Error("Provide a password.");

  const existing = await Users.findOne({
    where: {
      email: body.email,
    },
  });
  if (!existing) throw new Error("Account doesn't exist.");
  else {
    const matched = await comparePassword(body.password, existing.password);
    if (!matched) throw new Error("Password is incorrect");
    await sign({
      id: existing.id,
      fullname: existing.fullname,
    }).then((data) => {
      res.cookie("jwt", data, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        success: true,
        fullname: existing.fullname,
        message: "Login successful",
      });
    });
  }
};

export const getUsers = async () => {
  const res = await Users.findAll();
  return res;
};
