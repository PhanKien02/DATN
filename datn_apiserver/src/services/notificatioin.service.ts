import { getMessaging } from "firebase-admin/messaging";
import userRepository from "../repositories/userRepository";
import { BadRequestError } from "../utils/httpErrors";
import { Op } from "sequelize";

class NotificationService {
    async pushNotification(
        receiverId: number[],
        title: string,
        content: string,
        data?: any
    ) {
        const receiver = await userRepository.findAll({
            where: {
                id: { [Op.in]: receiverId },
            },
        });

        if (!receiver) throw new BadRequestError("Người Dùng Không Tồn Tại");
        const registrationTokens = receiver.map((rec) => rec.dataValues.fcmId);

        getMessaging()
            .sendEachForMulticast({
                tokens: registrationTokens,
                notification: {
                    title: title,
                    body: content,
                },
                data: data,
            })
            .then((response) => {
                // See the MessagingTopicManagementResponse reference documentation
                // for the contents of response.
                console.log(
                    "Successfully subscribed to topic:",
                    response.responses
                );
            })
            .catch((error) => {
                console.log("Error subscribing to topic:", error.response);
            });
    }
}
export default new NotificationService();
