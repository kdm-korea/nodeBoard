import ApplicationError from './error.Application';

class ConfictError extends ApplicationError {
  constructor(message) {
    super(409, message || 'Confict Error');
  }
}

export default ConfictError;
