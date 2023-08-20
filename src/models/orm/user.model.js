import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["QUIZ_MAKER", "QUIZ_TAKER"],
  },
});

export const UserModel = mongoose.model("User", UserSchema);
