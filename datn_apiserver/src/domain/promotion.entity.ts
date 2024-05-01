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
export default class Promotion extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id: number;

    @Column({ type: DataType.STRING })
    programName: string;

    @Column({ type: DataType.INTEGER })
    amount: number;

    @Column({ type: DataType.INTEGER })
    percent: number;

    @Column({ type: DataType.DATE })
    expDate: number;

    @Column({ type: DataType.INTEGER })
    conditionPrice: number;

    @HasMany(() => Booking)
    booking: Booking[];
}
