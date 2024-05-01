import { hash } from "bcryptjs";

const getHashPassword = (password: string) => {
  return hash(password, 10);
};

export default getHashPassword;
