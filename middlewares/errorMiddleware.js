const globalError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });


}

module.exports = globalError;
