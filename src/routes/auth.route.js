import express from "express";
import * as userService from "../services/user.service";
import { AppError } from "../helpers/app-error.js";
import * as hash from "../helpers/hash.js";
import * as jwt from "../helpers/jwt.js";
import * as config from "../helpers/config.js";
import * as auth from "../middlewares/auth.js";

const route = express.Router();
route.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await userService.findUserByUserName(username);
    if (!user) {
      throw new AppError("Invalid Credentials", 400);
    }
    try {
      await hash.verifyPassword(password);
    } catch (error) {
      throw new AppError("Invalid Credentials", 400);
    }
    const token = await jwt.createToken({ id: user._id }, config.authSecret);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

route.post(
  "/register",
  auth.authenticate,
  auth.authorize(["QUIZ_MAKER"]),
  async (req, res) => {
    try {
      await userService.createUser(req.body);
      res.status(200).json({ message: "User Successfully Registered" });
    } catch (error) {
      next(error);
    }
  }
);

export default route;
