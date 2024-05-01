import {
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import Booking from "./booking.entity";

@Table
export default class UnitPrice extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.BIGINT })
    id: number;

    @Column({ type: DataType.TIME })
    timeStart: Date;

    @Column({ type: DataType.TIME })
    timeEnd: Date;

    @Column({ type: DataType.INTEGER })
    price: number;

    @Column({ type: DataType.INTEGER })
    kmStart: number;

    @Column({ type: DataType.INTEGER })
    kmEnd: number;

    @HasMany(() => Booking)
    booking: Booking[];
}
