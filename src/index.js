import express from "express";
import quizRoute from "./routes/quiz.route.js";

const app = express();
app.use(express.json());
app.use("/api/v1/quizes", quizRoute);
app.listen(8080, () => {
  console.log(`server started on port 8080`);
});


