import Booking from "../domain/booking.entity";
import { Repository } from "./baseRepository";

class BookingRepository extends Repository<Booking> {
    constructor() {
        super(Booking);
    }
}
export default new BookingRepository().repository();
