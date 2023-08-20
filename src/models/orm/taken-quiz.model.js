import mongoose from "mongoose";

const TakenQuizSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  score: Number,
  totalQuestions: Number,
  isSubmitted: {
    type: Boolean,
    default: false,
  },
});

export const TakenQuizModel = mongoose.model("TakenQuiz", TakenQuizSchema);
