import { User } from "../utils/user";
import { JwtPayload as Payload } from "jsonwebtoken";

export interface JwtPayload extends Payload {
    user: User;
}
