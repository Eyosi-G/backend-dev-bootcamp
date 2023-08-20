import * as quizRepository from "../repositories/quiz.orm.repository.js";

export const createQuiz = (quiz) => {
  quizRepository.createQuiz(quiz);
};

export const getQuizes = (user) => quizRepository.getQuizes(user);

export const getQuizById = (id, user) => {
  return quizRepository.getQuizById(id, user);
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

export const startQuiz = (quizId, user) => {
  return quizRepository.startQuiz(quizId, user);
};

export const submitQuiz = async (quizId, user) => {
  await quizRepository.submitQuiz(quizId, user)
};

export const submitQuestionAnswer = async (
  quizId,
  questionId,
  answerChoiceIndex,
  user
) => {
  await quizRepository.submitQuestionAnswer(
    quizId,
    questionId,
    answerChoiceIndex,
    user
  );
};
