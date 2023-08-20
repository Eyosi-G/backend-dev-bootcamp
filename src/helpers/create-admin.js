import mongoose from "mongoose";
import * as config from "./config.js";
import { DB_URI } from "../db.js";
import * as userService from "../services/user.service.js";
const createAdmin = async () => {
  await mongoose.connect(DB_URI);
  await userService.createUser({
    role: "QUIZ_MAKER",
    username: config.adminUsername,
    password: config.adminPassword,
  });
  console.log("admin successfully created");
};

createAdmin();
