import { IPromotion } from "../interface/IPromotion";
import promotionRepository from "../repositories/promotionRepository";
import { BadRequestError } from "../utils/httpErrors";
import { User } from "../utils/user";

class PromotionService {
    async getAllPromotion() {
        return await promotionRepository.findAll();
    }

    async savePromotion(user: User, promotion: IPromotion) {
        if (promotion.id)
            promotionRepository.update(
                { ...promotion, updatedBy: user.userId, status: true },
                {
                    where: { id: promotion.id },
                }
            );
        else
            promotionRepository.create({
                ...promotion,
                status: true,
                createdBy: user.userId,
            });
    }
    async blockOrActivePromotion(
        user: User,
        promotionId: number,
        status: boolean
    ) {
        const promotion = await promotionRepository.findByPk(promotionId);
        if (!promotion) throw new BadRequestError("Chương Trình Không Tồn Tại");
        else
            return await promotionRepository.update(
                {
                    status: !status,
                    updatedBy: user.userId,
                },
                {
                    where: {
                        id: promotionId,
                    },
                }
            );
    }
}
export default new PromotionService();
