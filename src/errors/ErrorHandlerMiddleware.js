import initilizeRollbarLogger from "../services/rollbar";

const ErrorMiddleWare = (err, req, res, next) => {
  console.log('eeeee', err)
  // const statusCode = err.statusCode || 500;
  // rollbar.log(err);
  const rollbar = initilizeRollbarLogger();
  rollbar.error(err);
  res.status(statusCode).json({ message: err });
};

export default ErrorMiddleWare;
