import express from "express";
import * as quizService from "../services/quiz.service.js";
import { Quiz } from "../models/quiz.model.js";

const route = express.Router();
route.get("", function (req, res) {
  const quizes = quizService.getQuizes();
  res.status(200).json(quizes);
});

route.get("/:id", function (req, res) {
  const id = req.params.id;
  const quiz = quizService.getQuizById(id);
  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }
  res.status(200).json(quiz);
});

route.post("", function (req, res) {
  const title = req.body.title;
  const quiz = new Quiz(title);
  quizService.createQuiz(quiz);
  res.status(200).json({ message: "Quiz successfully created" });
});

route.post("/:id/questions", function (req, res) {
  const quizId = req.params.id;
  const questions = req.body;
  quizService.createQuestions(quizId, questions);
  res.status(200).json({ message: "questions successfully added" });
});

route.delete("/:id", function (req, res) {});

export default route;
