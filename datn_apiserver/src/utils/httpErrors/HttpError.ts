import httpStatus from "http-status";

abstract class HttpError extends Error {
  HttpStatus: number;

  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export default HttpError;
