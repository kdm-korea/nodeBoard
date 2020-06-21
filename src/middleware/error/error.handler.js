import BaseError from "../../product/help/exception/error.Base";

const ErrorHandler = async (err, req, res, next) => {
  //Logger
  //push notification
  if (err instanceof BaseError) {
    console.log("Custom Error Exception");
    res.status(err.status).json(err);
  } else if (err instanceof SyntaxError) {
    res.status(400).json({ message: "body syntex error" });
  } else {
    res.status(500).json({ errorMessage: "Server Error" });
    console.log("UnException Error Handling");
    console.log(err);
  }
};

export default ErrorHandler;
