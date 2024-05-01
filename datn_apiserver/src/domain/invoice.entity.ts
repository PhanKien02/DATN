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
import Booking from "./booking.entity";
import Income from "./income.entity";

@Table
export default class Invoice extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.BIGINT })
    id: number;

    @Column({ type: DataType.INTEGER })
    totalCost: number;

    @Column({ type: DataType.STRING })
    cashier: string;

    @Column({ type: DataType.STRING })
    paymentMethod: string;

    @Column({ type: DataType.DATE })
    date: Date;

    @ForeignKey(() => Booking)
    bookingId: number;

    @BelongsTo(() => Booking)
    booking: Booking;

    @BelongsTo(() => Income)
    income: Income;

    @ForeignKey(() => Income)
    @Column({ type: DataType.BIGINT })
    incomeId: number;
}
