import BaseError from "./error.Base";

class Forbioddan extends BaseError {
  constructor(message) {
    super(403, message || "콘텐츠에 접근할 권한이 없습니다.");
  }
}

export default Forbioddan;
