import { MongoClient } from "mongodb";
export const DB_URI = "mongodb://127.0.0.1:27017/quiz-db";
export const Client = new MongoClient(DB_URI);
