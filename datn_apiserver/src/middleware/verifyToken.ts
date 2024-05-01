import { NextFunction, Response } from "express";
import { HttpError, UnauthorizedError } from "../utils/httpErrors";
import { verifyToken } from "../utils/auth/jwt";
import AuthenticatedRequest from "../types/request";
import { setCurrentUser } from "../utils/currentUser";

export const veryfyToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const bearerHeader = req.headers.authorization;

        if (!bearerHeader) {
            throw new UnauthorizedError(
                "A token is required for authentication"
            );
        }

        const splitHeader = bearerHeader.split(" ");

        if (splitHeader.length != 2 || splitHeader[0] != "Bearer") {
            throw new UnauthorizedError("Invalid token");
        }

        const token = splitHeader[1];

        const { user } = verifyToken(token);
        if (!user) throw new Error();
        setCurrentUser(user);

        req.user = user;
        return next();
    } catch (err) {
        return next(
            err instanceof HttpError
                ? err
                : new UnauthorizedError("Invalid token")
        );
    }
};
