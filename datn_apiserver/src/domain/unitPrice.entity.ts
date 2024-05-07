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
    pastPrice: number;

    @Column({ type: DataType.INTEGER })
    presentPrice: number;

    @Column({ type: DataType.INTEGER })
    kmStart: number;

    @Column({ type: DataType.INTEGER })
    kmEnd: number;

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
