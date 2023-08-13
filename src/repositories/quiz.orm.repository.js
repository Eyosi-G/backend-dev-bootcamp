import { QuestionModel } from "../models/orm/question.model.js";
import { QuizModel } from "../models/orm/quiz.model.js";

export const createQuiz = async (quiz) => {
  const model = new QuizModel(quiz);
  await model.save();
};

export const getQuizes = () => {
  return QuizModel.find().populate("questions");
};

export const getQuizById = (id) => {
  return QuizModel.findById(id).populate("questions");
};

export const deleteQuizById = (id) => {
  return QuizModel.deleteOne({ _id: id });
};

export const createQuestions = async (quizId, questions) => {
  const _questions = [];
  questions.forEach((question) => {
    _questions.push({
      ...question,
      quiz: quizId,
    });
  });
  const insertedQuizes = await QuestionModel.insertMany(_questions);
  await QuizModel.updateOne(
    { _id: quizId },
    { $set: { questions: insertedQuizes.map((inserted) => inserted._id) } }
  );
};

export const getQuestionsByQuizId = (quizId) => {
  return QuestionModel.find({ quiz: quizId }).populate('quiz');
};
