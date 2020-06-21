import BaseError from "./error.Base";

class NotFound extends BaseError {
  constructor(message) {
    super(404, message || "콘텐츠가 존재하지 않습니다.");
  }
}

export default NotFound;
