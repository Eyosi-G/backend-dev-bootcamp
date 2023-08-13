import express from "express";
import quizRoute from "./routes/quiz.route.js";
import mongoose from "mongoose";
import { DB_URI } from "./db.js";

const app = express();
app.use(express.json());
app.use("/api/v1/quizes", quizRoute);

app.listen(8080, async () => {
  await mongoose.connect(DB_URI);
  console.log(`server started on port 8080`);
});
