class ApplicationError extends Error {
  constructor(status, message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
    this.errorType = this.constructor.name;
    this.message = message || 'NOT DEFINED ERROR';
  }
}

export default ApplicationError;
