import httpStatus from "http-status";
import HttpError from "./HttpError";

class NotFoundError extends HttpError {
  HttpStatus: number;

  constructor(msg: string) {
    super(msg);

    this.HttpStatus = httpStatus.NOT_FOUND;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export default NotFoundError;
