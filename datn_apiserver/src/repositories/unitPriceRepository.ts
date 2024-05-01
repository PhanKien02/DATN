import UnitPrice from "../domain/unitPrice.entity";
import { Repository } from "./baseRepository";

class UnitPriceRepository extends Repository<UnitPrice> {
    constructor() {
        super(UnitPrice);
    }
}
export default new UnitPriceRepository().repository();
