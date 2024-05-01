import httpContext from "express-http-context";
import { User } from "./user";

type ContextType = {
    user: User;
    organisationId: string;
};

const setContext = <T extends keyof ContextType>(
    key: T,
    value: ContextType[T]
) => httpContext.set(key, value);

const getContext = <T extends keyof ContextType>(key: T) =>
    httpContext.get(key) as ContextType[T];

export { setContext, getContext };
