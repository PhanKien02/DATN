import Invoice from "../domain/invoice.entity";
import { Repository } from "./baseRepository";

class InvoiceRepository extends Repository<Invoice> {
    constructor() {
        super(Invoice);
    }
}
export default new InvoiceRepository().repository();
