import { Repository } from "./baseRepository";
import Wards from "../domain/wards.entity";

class WardRepository extends Repository<Wards> {
    constructor() {
        super(Wards);
    }
}
export default new WardRepository().repository();
