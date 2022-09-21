/* This file contains a middleware which will be inserted when we need to handle a new error */

import ErrorHandler from "./ErrorHandler";

export const handleErrors = (err, req, res, next) => {
  err.statusCode = statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // some random error

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.value)} entered`;
    err = new ErrorHandler(400, message);
  }

  // Invalid Mongoose id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(404, message);
  }

  // Json Web Token Error
  if (err.name === "JsonWebTokenError") {
    const message = `Invalid Token, Please try again`;
    err = new ErrorHandler(400, message);
  }

  // Jwt expire error
  if (err.name === "TokenExpiredError") {
    const message = `Token Expired, Please try again`;
    err = new ErrorHandler(404, message);
  }

  // sending response with our custom error
  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};
