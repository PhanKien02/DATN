import { Repository } from "./baseRepository";
import RouteDriver from "../domain/routeDriver.entity";

class routeDriverRepository extends Repository<RouteDriver> {
    constructor() {
        super(RouteDriver);
    }
}
export default new routeDriverRepository().repository();
