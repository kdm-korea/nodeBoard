import BaseError from './error.Base';

class NotFoundUrl extends BaseError {
  constructor(message) {
    super(404, message || 'Not Found Url');
  }
}

export default NotFoundUrl;
