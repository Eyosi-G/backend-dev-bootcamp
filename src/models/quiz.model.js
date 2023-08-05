export class Quiz {
  constructor(title) {
    this.title = title;
    this.isOpen = false;
    this.id = Date.now();
    this.questions = [];
  }

  addQuestion(question) {
    this.questions.push(question);
  }
}

export class Question {
  constructor(questionNumber, text, rightChoice) {
    this.questionNumber = questionNumber;
    this.text = text;
    this.choices = [];
    this.rightChoice = rightChoice;
  }
}

