import httpStatus from "http-status";
import HttpError from "./HttpError";

class BadRequestError extends HttpError {
  HttpStatus: number;

  constructor(msg: string) {
    super(msg);

    this.HttpStatus = httpStatus.BAD_REQUEST;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export default BadRequestError;
