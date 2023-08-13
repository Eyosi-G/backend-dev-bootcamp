import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

export const QuizModel = mongoose.model("Quiz", QuizSchema);
