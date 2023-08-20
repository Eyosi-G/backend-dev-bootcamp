import express from "express";
import * as quizService from "../services/quiz.service.js";
import * as auth from "../middlewares/auth.js"
const route = express.Router();

// PUT /api/v1/questions/:id/submit
route.put(
  "/:id/submit",
  auth.authorize(["QUIZ_TAKER"]),
  async function (req, res) {
    const questionId = req.params.id;
    const quizId = req.body.quizId;
    const answerChoiceIndex = req.body.answerChoiceIndex;
    await quizService.submitQuestionAnswer(
      quizId,
      questionId,
      answerChoiceIndex,
      req.user
    );
    res.status(200).json({ message: "Answer submitted successfully" });
  }
);

export default route;
