import BaseError from '../../product/help/exception/error.Base';

const ErrorHandler = async (err, req, res, next) => {
  //Logger
  //push notification
  if (err instanceof BaseError) {
    console.log('Custom Error Exception');
    res.status(err.status).json(err);
  } else {
    console.log('UnException Error Handling');
    console.log(err);
  }
};

export default ErrorHandler;
