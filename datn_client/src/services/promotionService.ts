import { IPromotion } from "../models/promotion";
import baseRequest from "./baseRequest";

class PromotionService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "promotion/";

     async getAllPromotion() {
          const response = await baseRequest.get(this.BasseUrl);
          return response.data;
     }
     async savePromotion(promotion: IPromotion) {
          const response = await baseRequest.post(this.BasseUrl, promotion);
          return response.data;
     }
     async blockOrActivePromotion(promotionId: number, status: boolean) {
          const response = await baseRequest.get(this.BasseUrl + `status`, {
               params: { status, promotionId },
          });
          return response.data;
     }
}
export default new PromotionService();
