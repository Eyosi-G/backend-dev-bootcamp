import { ObjectId } from "mongodb";
import { Client } from "../db.js";

const DB_NAME = "quiz-db";
const QUIZ_COLLECTION = "quizes";
const QUESTION_COLLECTION = "questions";

export const createQuiz = async (quiz) => {
  const db = Client.db(DB_NAME);
  const quizCollection = db.collection(QUIZ_COLLECTION);
  await quizCollection.insertOne({
    ...quiz,
    isOpen: false,
  });
};

export const getQuizes = () => {
  const db = Client.db(DB_NAME);
  const quizCollection = db.collection(QUIZ_COLLECTION);
  return quizCollection.find().toArray();
};

export const getQuizById = (id) => {
  const db = Client.db(DB_NAME);
  const quizCollection = db.collection(QUIZ_COLLECTION);
  //   return quizCollection.findOne({ _id: new ObjectId(id) });
  return quizCollection
    .aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: QUESTION_COLLECTION,
          foreignField: "quizId",
          localField: "_id",
          as: "questions",
        },
      },
    ])
    .toArray();
};

export const deleteQuizById = (id) => {
  const db = Client.db(DB_NAME);
  const quizCollection = db.collection(QUIZ_COLLECTION);
  return quizCollection.deleteOne({ _id: new ObjectId(id) });
};

export const createQuestions = (quizId, questions) => {
  const db = Client.db(DB_NAME);
  const questionCollection = db.collection(QUESTION_COLLECTION);

  const _questions = [];
  questions.forEach((question) => {
    _questions.push({
      ...question,
      quizId: new ObjectId(quizId),
    });
  });

  return questionCollection.insertMany(_questions);
};

export const getQuestionsByQuizId = (quizId) => {
  const db = Client.db(DB_NAME);
  const questionCollection = db.collection(QUESTION_COLLECTION);
  //   return questionCollection.find({ quizId: new ObjectId(quizId) }).toArray();
  return questionCollection
    .aggregate([
      {
        $match: {
          quizId: new ObjectId(quizId),
        },
      },
      {
        $lookup: {
          from: QUIZ_COLLECTION,
          foreignField: "_id",
          localField: "quizId",
          as: "quiz",
        },
      },
    ])
    .toArray();
};
