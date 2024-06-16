import Notification from "../domain/notification.entity";
import { Repository } from "./baseRepository";

class NotificationRepository extends Repository<Notification> {
    constructor() {
        super(Notification);
    }
}
export default new NotificationRepository().repository();
