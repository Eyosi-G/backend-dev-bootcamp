import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  questionNumber: {
    type: Number,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
  choices: [
    {
      type: String,
    },
  ],
  rightChoiceIndex: {
    type: Number,
    min: 0,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
});

export const QuestionModel = mongoose.model("Question", QuestionSchema);
