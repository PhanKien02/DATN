import { Request as ExpressRequest } from "express";
import { User } from "../utils/user";

export interface Request extends ExpressRequest {
    id: string;
}

export default interface AuthenticatedRequest extends Request {
    user: User;
    data?: any;
}
