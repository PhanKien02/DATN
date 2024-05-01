import { IPromotion } from "../interface/IPromotion";
import promotionRepository from "../repositories/promotionRepository";
import { User } from "../utils/user";

class PromotionService {
    async getAllPromotion() {
        return await promotionRepository.findAll();
    }

    async savePromotion(user: User, promotion: IPromotion) {
        if (promotion.id)
            promotionRepository.update(promotion, {
                where: { id: promotion.id },
            });
        else promotionRepository.create(promotion);
    }
}
export default new PromotionService();
