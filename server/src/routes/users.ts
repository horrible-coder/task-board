import { Router } from "express";
import { createUser, getUsers, loginUser } from "../controllers/users";

const route = Router();

route.post("/signup", async (req, res) => {
  try {
    await createUser(req, res);
  } catch (err) {
    return res.status(422).json({
      errors: { body: "Could not create user. " + err.message },
    });
  }
});

route.post("/login", async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (err) {
    return res.status(422).json({
      errors: { body: "Login failed. " + err.message },
    });
  }
});

route.post("/logout", async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    return res.status(422).json({
      errors: { body: "Logout failed." },
    });
  }
});

route.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({
      errors: {
        success: false,
        message: "Could not fetch users. " + err.message,
      },
    });
  }
});

export const usersRoute = route;
