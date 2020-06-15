import BaseError from './error.Base';

class ConfictError extends BaseError {
  constructor(message) {
    super(409, message || 'Confict Error');
  }
}

export default ConfictError;
