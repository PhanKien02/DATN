import { getContext, setContext } from "./context";
import { User } from "./user";

const setCurrentUser = (user: User) => setContext("user", user);

const getCurrentUser = () => getContext("user");

export { setCurrentUser, getCurrentUser };
