import express from "express";
import * as quizService from "../services/quiz.service.js";
import * as auth from "../middlewares/auth.js";

const route = express.Router();
// GET /api/v1/quizes
route.get(
  "",
  auth.authenticate,
  auth.authorize(["QUIZ_MAKER", "QUIZ_TAKER"]),
  async function (req, res) {
    const quizes = await quizService.getQuizes(req.user);
    res.status(200).json(quizes);
  }
);

// GET /api/v1/quizes/:id
route.get(
  "/:id",
  auth.authenticate,
  auth.authorize(["QUIZ_MAKER", "QUIZ_TAKER"]),
  async function (req, res) {
    const id = req.params.id;
    const quiz = await quizService.getQuizById(id, req.user);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  }
);

// DELETE /api/v1/quizes/:id
route.delete(
  "/:id",
  auth.authenticate,
  auth.authorize(["QUIZ_MAKER"]),
  async function (req, res) {
    const id = req.params.id;
    await quizService.deleteQuizById(id);
    res.status(200).json({ message: "Quiz successfully deleted" });
  }
);

// POST /api/v1/quizes
route.post(
  "",
  auth.authenticate,
  auth.authorize(["QUIZ_MAKER"]),
  function (req, res) {
    quizService.createQuiz(req.body);
    res.status(200).json({ message: "Quiz successfully created" });
  }
);

// POST /api/v1/quizes/:id/questions
route.post(
  "/:id/questions",
  auth.authenticate,
  auth.authorize(["QUIZ_MAKER"]),
  async function (req, res) {
    const quizId = req.params.id;
    const questions = req.body;
    await quizService.createQuestions(quizId, questions);
    res.status(200).json({ message: "questions successfully added" });
  }
);

// GET /api/v1/quizes/:id/start
route.get(
  "/:id/start",
  auth.authenticate,
  auth.authorize(["QUIZ_TAKER"]),
  async function (req, res) {
    try {
      const quizId = req.params.id;
      await quizService.startQuiz(quizId, req.user);
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/v1/quizes/:id/submit
route.get(
  "/:id/submit",
  auth.authorize(["QUIZ_TAKER"]),
  async function (req, res) {
    try {
      const quizId = req.params.id;
      await quizService.submitQuiz(quizId, req.user);
    } catch (error) {
      next(error);
    }
  }
);

export default route;
