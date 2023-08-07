import express from "express";
import * as quizService from "../services/quiz.service.js";
import { Quiz } from "../models/quiz.model.js";

const route = express.Router();
route.get("", async function (req, res) {
  const quizes = await quizService.getQuizes();
  res.status(200).json(quizes);
});

route.get("/:id", async function (req, res) {
  const id = req.params.id;
  const quiz = await quizService.getQuizById(id);
  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }
  res.status(200).json(quiz);
});

route.delete("/:id", async function (req, res) {
  const id = req.params.id;
  await quizService.deleteQuizById(id);
  res.status(200).json({ message: "Quiz successfully deleted" });
});

route.post("", function (req, res) {
  quizService.createQuiz(req.body);
  res.status(200).json({ message: "Quiz successfully created" });
});

route.post("/:id/questions", async function (req, res) {
  const quizId = req.params.id;
  const questions = req.body;
  await quizService.createQuestions(quizId, questions);
  res.status(200).json({ message: "questions successfully added" });
});

route.get("/:id/questions", async function (req, res) {
  const quizId = req.params.id;
  const questions = await quizService.getQuestionsByQuizId(quizId)
  res.status(200).json(questions)
});

export default route;
