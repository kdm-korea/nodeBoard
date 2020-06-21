import BaseError from "./error.Base";

class UndefinedToken extends BaseError {
  constructor(message) {
    super(411, message || "토큰이 없습니다.");
  }
}

export default UndefinedToken;
