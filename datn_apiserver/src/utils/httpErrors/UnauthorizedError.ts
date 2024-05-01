import httpStatus from "http-status";
import HttpError from "./HttpError";

class UnauthorizedError extends HttpError {
  HttpStatus: number;

  constructor(msg: string) {
    super(msg);

    this.HttpStatus = httpStatus.UNAUTHORIZED;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default UnauthorizedError;
