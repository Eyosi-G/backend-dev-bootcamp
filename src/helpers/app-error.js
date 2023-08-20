export class AppError extends Error {
  constructor(message, statusCode) {
    this.message = message || "Internal Server Error";
    this.statusCode = statusCode || 500;
    super(this.message);
  }
}
