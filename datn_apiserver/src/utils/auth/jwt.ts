import { JwtPayload } from "../../types/jwtPayload";
import jwt from "jsonwebtoken";
import { User } from "../user";

const TOKEN_EXPIRE_TIME = 3600000; // seconds

const signToken = (payload: Partial<User>, isAccess = true) => {
    const token = jwt.sign(
        { user: payload },
        process.env.TOKEN_SECRET,
        isAccess ? { expiresIn: TOKEN_EXPIRE_TIME } : {}
    );
    const decodePayload = jwt.decode(token);
    if (typeof decodePayload === "string") throw new Error("JWT decode Error");
    const expiresAt = decodePayload.exp * 1000;

    return { token, expiresAt };
};

const verifyToken = (token: string) => {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    if (typeof payload === "string") throw new Error("JWT decode Error");
    return payload as JwtPayload;
};

export { signToken, verifyToken };
