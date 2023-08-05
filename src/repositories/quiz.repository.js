const quizes = [];

export const createQuiz = (quiz) => {
  quizes.push(quiz);
};

export const getQuizes = () => quizes;

export const getQuizById = (id) => {
  return quizes.find((quize) => quize.id == id);
};

export const createQuestions = (quizId, questions) => {
  const quiz = getQuizById(quizId);
  questions.forEach((question) => {
    quiz.addQuestion(question);
  });
};
