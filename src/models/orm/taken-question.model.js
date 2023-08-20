import mongoose from "mongoose";

const TakenQuestionSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  answerChoiceIndex: {
    type: Number,
    required: true,
  },
  isAnswerCorrect: {
    type: Boolean,
    required: true,
  }
});

export const TakenQuestionModel = mongoose.model(
  "TakenQuestion",
  TakenQuestionSchema
);
