import httpStatus from "http-status";
import HttpError from "./HttpError";

class ConflictError extends HttpError {
  HttpStatus: number;

  constructor(msg: string) {
    super(msg);

    this.HttpStatus = httpStatus.CONFLICT;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export default ConflictError;
