/* This is our custom error handler class which extends the Error class in js*/
class ErrorHandler extends Error {
  // calling constructor to accept our custom message and statusCode
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // it will display the exact path where we got error
    // Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
