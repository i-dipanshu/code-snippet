export default (err, req, res, next) => {
    err.statusCode = statusCode || 500;
    err.message = message || "Internal Server Error";

    res.status(err.statusCode).json({
        success: false,
        message : err.message
    })
}