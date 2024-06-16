export interface Notification {
    id?: number;

    subject: string;

    content: string;

    notification_type: string;

    summary: string;

    receiverId: number;

    senderId: number;
}
