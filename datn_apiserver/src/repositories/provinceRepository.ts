import { Repository } from "./baseRepository";
import Provinces from "../domain/provinces.entity";

class ProvincesRepository extends Repository<Provinces> {
    constructor() {
        super(Provinces);
    }
}
export default new ProvincesRepository().repository();
