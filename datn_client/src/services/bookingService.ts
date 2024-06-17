import baseRequest from "./baseRequest";

class BookingService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "booking/";

     async getAllBooking(page: number, limit: number, search: string) {
          const response = await baseRequest.get(this.BasseUrl, {
               params: { page, limit, search },
          });
          return response.data;
     }

     async cancelBooking(id: number, cancelReason: string) {
          await baseRequest.get(this.BasseUrl + "cancel", {
               params: { id, cancelReason },
          });
     }

     async assignDriver(id: number, driver: number) {
          await baseRequest.put(this.BasseUrl + "assign", { id, driver });
     }
}
export default new BookingService();
