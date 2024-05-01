import Districts from "../domain/districts.entity";
import { Repository } from "./baseRepository";

class DistrictsRepository extends Repository<Districts> {
    constructor() {
        super(Districts);
    }
}
export default new DistrictsRepository().repository();
