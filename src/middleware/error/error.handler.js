const ErrorHandler = async (err, req, res, next) => {
  res.status(err.status).json(err);
};

export default ErrorHandler;
