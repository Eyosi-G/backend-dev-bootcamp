import { AppError } from "../helpers/app-error.js";
import { QuestionModel } from "../models/orm/question.model.js";
import { QuizModel } from "../models/orm/quiz.model.js";
import { TakenQuestionModel } from "../models/orm/taken-question.model.js";
import { TakenQuizModel } from "../models/orm/taken-quiz.model.js";

export const createQuiz = async (quiz) => {
  const model = new QuizModel(quiz);
  await model.save();
};

export const getQuizes = (user) => {
  if (user.role === "QUIZ_MAKER") {
    return QuizModel.find().populate("questions");
  }

  if (user.role === "QUIZ_TAKER") {
    return QuizModel.find({ isActive: true }).populate({
      path: "questions",
      foreignField: "quiz",
      select: "-rightChoiceIndex",
    });
  }
};

export const getQuizById = (id, user) => {
  if (user.role == "QUIZ_MAKER") {
    return QuizModel.findById(id).populate("questions");
  }
  if (user.role == "QUIZ_TAKER") {
    return QuizModel.findById(id).populate({
      path: "questions",
      foreignField: "quiz",
      select: "-rightChoiceIndex",
    });
  }
};

export const deleteQuizById = (id) => {
  return QuizModel.deleteOne({ _id: id });
};

export const createQuestions = async (quizId, questions) => {
  const _questions = [];
  questions.forEach((question, index) => {
    _questions.push({
      ...question,
      questionNumber: index + 1,
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
  return QuestionModel.find({ quiz: quizId }).populate("quiz");
};

export const startQuiz = async (quizId, user) => {
  const takenQuiz = await TakenQuizModel.findOne({
    quiz: quizId,
    user: user._id,
  });
  if (!takenQuiz) throw AppError("Quiz has already started", 401);
  const totalQuestions = await QuestionModel.countDocuments({ quiz: quizId });
  const model = new TakenQuizModel({
    quiz: quizId,
    score: 0,
    totalQuestions,
    user: user._id,
  });
  await model.save();
};

export const submitQuiz = async (quizId, user) => {
  const takenQuiz = await TakenQuizModel.findOne({
    quiz: quizId,
    user: user._id,
  });
  if (!takenQuiz) throw AppError("Quiz not found", 401);

  const correctAnswersCount = TakenQuestionModel.countDocuments({
    question: { quiz: quizId },
    isAnswerCorrect: true,
  }).populate("question");

  takenQuiz.score = correctAnswersCount;
  takenQuiz.isSubmitted = true;
  await takenQuiz.save();
};

export const submitQuestionAnswer = async (
  quizId,
  questionId,
  answerChoiceIndex,
  user
) => {
  const takenQuiz = await TakenQuizModel.findOne({
    quiz: quizId,
    user: user._id,
  });
  if (!takenQuiz) throw AppError("Quiz not found", 401);
  if (takenQuiz.isSubmitted) {
    throw AppError("Quiz is already submited", 401);
  }

  const question = await QuestionModel.findById(questionId);
  const takenQuestion = await TakenQuestionModel.findOne({
    question: questionId,
  });
  if (takenQuestion) {
    TakenQuestionModel.updateOne(
      { _id: takenQuestion },
      {
        $set: {
          answerChoiceIndex,
          isAnswerCorrect: answerChoiceIndex === question.rightChoiceIndex,
        },
      }
    );
  } else {
    const takenQuestion = new TakenQuestionModel({
      user: user._id,
      answerChoiceIndex,
      isAnswerCorrect: answerChoiceIndex === question.rightChoiceIndex,
      question: question._id,
    });
    await takenQuestion.save();
  }
};
