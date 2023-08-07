import express from "express";
import quizRoute from "./routes/quiz.route.js";
import { Client } from "./db.js";

const app = express();
app.use(express.json());
app.use("/api/v1/quizes", quizRoute);

app.listen(8080, async () => {
  await Client.connect();
  console.log(`server started on port 8080`);
});
