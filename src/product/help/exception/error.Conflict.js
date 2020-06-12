import BaseError from './error.Base';

class ConflictError extends BaseError {
  constructor(message) {
    super(409, message || 'Confict Error');
  }
}

export default ConflictError;
