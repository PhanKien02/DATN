import { HttpError, NotFoundError } from "../utils/httpErrors";
import { NextFunction, Response } from "express";
import { Request } from "../types/request";
import httpStatus from "http-status";

const errorHandler = (err, req: Request, res: Response, __: NextFunction) => {
    const e =
        err instanceof HttpError
            ? {
                  code: err.HttpStatus,
                  message: err.message,
              }
            : {
                  code: httpStatus.INTERNAL_SERVER_ERROR,
                  message: "Internal server error",
              };
    console.log(err);

    return res.status(e.code).send(e);
};

const notFoundHandler = (_: Request, __: Response, next: NextFunction) => {
    return next(new NotFoundError("404 Not Found"));
};

export { errorHandler, notFoundHandler };
