/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import User from "./user.entity";

/**
 * A Notification.
 */
@Table
export default class Notification extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.STRING })
    subject: string;

    @Column({ type: DataType.STRING })
    content: string;

    @Column({ type: DataType.STRING })
    notification_type: string;

    @Column({ type: DataType.STRING })
    summary: String;

    @BelongsTo(() => User)
    receiver: User;

    @ForeignKey(() => User)
    receiverId: User;

    @BelongsTo(() => User)
    sender: User;

    @ForeignKey(() => User)
    senderId: User;
}
