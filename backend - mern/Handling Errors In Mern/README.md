# Handle errors like a pro in Mern
## Why do we need to make custom error Handler
- Our application need various error to be handled and we need to make sure that it is done in a organized way.
- So, instead of defining a new error handler every times it occurs we could simply just make a class and pass the error and let them do the rest of stuff.
- In this way, we are following `DRY` principle and save ourselves from repeating 100 of lines codes.

## How Do We Do this
- In order to do this, we need to create a class whose fields would a error message, status code ...
- Now, we create a new object of this class whenever we need to handle a error
  
```javascript
    class ErrorHandler extends Error{
        // passing our error message and statusCode as argument in constructor
        constructor(statusCode, message){
            super(message);
            this.statusCode = statusCode;
        }
    }
    export default ErrorHandler;
```

## Middleware to handle some most popular error
```javascript
import ErrorHandler from "./ErrorHandler"

export const handleErrors = (err, req, res, next) => {
    err.statusCode = statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // some random error 

    // Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.value)} entered`;
        err = new ErrorHandler(400, message);
    }

    // Invalid Mongoose id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(404, message);
    }

    // Json Web Token Error
    if(err.name === "JsonWebTokenError"){
        const message = `Invalid Token, Please try again`;
        err = new ErrorHandler(400, message);
    }

    // Jwt expire error
    if(err.name === "TokenExpiredError"){
        const message = `Token Expired, Please try again`;
        err = new ErrorHandler(404, message);
    }

    // sending response with our custom error
    res.status(statusCode).json({
        success: false,
        message: err.message
    });
}
```
## Handling async errors
- We often end up using lots of try and catch block to handle error in async functions
- It would more organized and very convenient to create a separate class to  handle all the error throw at us
- In order to this we can wrap for async functions with the `handleAsyncError` function.
```javascript
export default (handleAsyncError) => (req, res, next) => {
    /* if promise is not resolved then catch the error passing it 
     to the next function and at next we can create a new object for ErrorHandler class to handle the error*/
    Promise.resolve(handleAsyncError(req, res, next)).catch(next);
}
```
```javascript
import handleAsyncError from './handleAsyncError.js'

const getUser = handleAsyncError((req, res, next) => {
    const user = await User.findById(req.params.id);

    // failed to resolve so, we handled the error
    if(!user){
        return next(new ErrorHandler(404, "User Not Found"));
    }
})
```
 
## Uncaught Exception
```javascript
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to Uncaught Exception.");
  server.close(() => {
    process.exit(1);
  });
});
```

## Unhandled Promise Rejections
```javascript
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection.");

  server.close(() => {
    process.exit(1);
  });
});
```