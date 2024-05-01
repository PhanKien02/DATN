import baseRequest from "./baseRequest";

class PromotionService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "/promotion";

     async getAllPromotion() {
          const response = await baseRequest.get(this.BasseUrl);
          return response.data;
     }
}
export default new PromotionService();
