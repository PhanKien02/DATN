import baseRequest from "./baseRequest";

class ProvinceService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "province";
     async getAllProvince() {
          const response = await baseRequest.get(this.BasseUrl);
          return response.data;
     }
}

export const provinceService = new ProvinceService();
