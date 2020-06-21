import ErrorMessage from "../../product/help/exception";

const NotFoundHandler = (req, res) => {
  throw new ErrorMessage.NotFoundUrl("없는 페이지입니다.");
};

export default NotFoundHandler;
