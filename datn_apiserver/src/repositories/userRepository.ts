import User from "../domain/user.entity";
import { Repository } from "./baseRepository";

class UserRepository extends Repository<User> {
    constructor() {
        super(User);
    }
}
export default new UserRepository().repository();
