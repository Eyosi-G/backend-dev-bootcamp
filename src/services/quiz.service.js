import * as quizRepository from "../repositories/quiz.orm.repository.js";

export const createQuiz = (quiz) => {
  quizRepository.createQuiz(quiz);
};

export const getQuizes = () => quizRepository.getQuizes();

export const getQuizById = (id) => {
  return quizRepository.getQuizById(id);
};

export const deleteQuizById = (id) => {
  return quizRepository.deleteQuizById(id);
};

export const createQuestions = (quizId, questions) => {
  return quizRepository.createQuestions(quizId, questions);
};

export const getQuestionsByQuizId = (quizId) => {
  return quizRepository.getQuestionsByQuizId(quizId);
};
