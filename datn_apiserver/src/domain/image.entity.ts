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

@Table
export default class Image extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.BIGINT })
    id: number;

    @Column({ type: DataType.STRING })
    link: string;

    @Column({ type: DataType.STRING })
    text: string;

    @BelongsTo(() => Booking)
    booking: Booking;

    @ForeignKey(() => Booking)
    @Column({ type: DataType.BIGINT })
    bookingid: number;
}
