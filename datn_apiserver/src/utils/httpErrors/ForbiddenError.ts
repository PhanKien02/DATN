import httpStatus from "http-status";
import HttpError from "./HttpError";

class ForbiddenError extends HttpError {
  HttpStatus: number;

  constructor(msg: string) {
    super(msg);

    this.HttpStatus = httpStatus.FORBIDDEN;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export default ForbiddenError;
