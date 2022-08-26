const ErrorMiddleWare = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log("asdsad", err);
  res.status(statusCode).json({ message: err });
  return;
};

export default ErrorMiddleWare;
