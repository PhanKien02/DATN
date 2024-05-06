import { IUnitPrice } from "../models/unitPrice";
import baseRequest from "./baseRequest";

class unitPriceService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "price";

     async getAllPrice() {
          const response = await baseRequest.get(this.BasseUrl);
          console.log("data:", response.data);

          return response.data;
     }
     async savePrice(promotion: IUnitPrice) {
          const response = await baseRequest.post(this.BasseUrl, promotion);
          return response.data;
     }
}
export default new unitPriceService();
