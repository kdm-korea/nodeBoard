import BaseError from './error.Base';

class Unauthenticated extends BaseError {
  constructor(message) {
    super(401, message || '인증이 완료되지 않았습니다.');
  }
}

export default Unauthenticated;
