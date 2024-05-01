import {
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import Booking from "./booking.entity";
import User from "./user.entity";

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
    startDate: Date;

    @Column({ type: DataType.DATE })
    expDate: Date;

    @Column({ type: DataType.INTEGER })
    conditionPrice: number;

    @Column({ type: DataType.BOOLEAN })
    status: boolean;

    @HasMany(() => Booking)
    booking: Booking[];

    @Column
    @ForeignKey(() => User)
    createdBy?: number;

    @Column
    @ForeignKey(() => User)
    updatedBy?: number;

    @CreatedAt
    @Column
    createdAt?: Date;

    @UpdatedAt
    @Column
    updatedAt?: Date;
}
