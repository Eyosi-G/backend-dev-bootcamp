import * as quizRepository from "../repositories/quiz.repository.js";

export const createQuiz = (quiz) => {
  quizRepository.createQuiz(quiz);
};

export const getQuizes = () => quizRepository.getQuizes();

export const getQuizById = (id) => {
  return quizRepository.getQuizById(id);
};

export const createQuestions = (quizId, questions) => {
  quizRepository.createQuestions(quizId, questions);
};
