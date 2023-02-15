const {
  JsonWebTokenError,
  TokenExpiredError,
} = require('jsonwebtoken');
//const Logger = require('../../logger/Logger');

const errorHandler = (error, req, res, next) => {
  const statusCode =
    error instanceof TokenExpiredError ||
    error instanceof JsonWebTokenError
      ? 403
      : error.status || 500;
  let body = {
    success: false,
    return: {
      status: statusCode,
      error: error.message,
      path: req.url,
      method: req.method,
      timeStamp: new Date(),
    },
  };

  res.status(statusCode);
  res.json(body);
  //Logger.error(JSON.stringify(body));
  return next();
};

module.exports = errorHandler;
