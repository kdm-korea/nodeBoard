import BaseError from './error.Base';

class ExpiredToken extends BaseError {
  constructor(message) {
    super(401, message || '만료된 토큰입니다.');
  }
}

export default ExpiredToken;
