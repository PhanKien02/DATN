import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import User from "./user.entity";
import Booking from "./booking.entity";
import Invoice from "./invoice.entity";

@Table
export default class Income extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.BIGINT })
    id: number;

    @Column({ type: DataType.INTEGER })
    amount: number;

    @Column({ type: DataType.STRING })
    percentReceivedDate: string;

    @Column({ type: DataType.BOOLEAN })
    paymentStatus: boolean;

    @Column({ type: DataType.STRING })
    paymentImage: string;

    @Column({ type: DataType.DATE })
    date: Date;

    @ForeignKey(() => User)
    driverId: number;

    @BelongsTo(() => User)
    driver: User;

    @HasMany(() => Invoice)
    invoice: Invoice;
}
