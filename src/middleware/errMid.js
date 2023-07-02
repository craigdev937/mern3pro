class ErrClass {
    notFound = (req, res, next) => {
        const error = new Error(`Not Found - 
            ${req.originalUrl}`);
        res.status(404);
        next(error);
    };

    errorHandler = (error, req, res, next) => {
        const statusCode = res.statusCode === 200 ? 
            500 : res.statusCode;
        const message = error.message;
        if (error.name === "CastError" && 
            error.kind === "ObjectId"
        ) {
            statusCode = 404;
            message = "Resource is NOT Found!";
        };
        res.status(statusCode).json({
            message: message,
            stack: error.stack
        })
    };
};

export const ERR = new ErrClass();


