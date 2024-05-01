import { Repository } from "./baseRepository";
import Promotion from "../domain/promotion.entity";

class PromotionRepository extends Repository<Promotion> {
    constructor() {
        super(Promotion);
    }
}
export default new PromotionRepository().repository();
