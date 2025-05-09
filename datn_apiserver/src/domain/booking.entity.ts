/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
    BelongsTo,
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
import User from "./user.entity";
import Image from "./image.entity";
import Promotion from "./promotion.entity";
import UnitPrice from "./unitPrice.entity";
/**
 * A Booking.
 */
@Table({
    timestamps: true,
})
export default class Booking extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.DATE })
    date: Date;

    @Column({ type: DataType.STRING })
    statused: string;

    @Column({ type: DataType.STRING })
    cancelReason: string;

    @Column({ type: DataType.INTEGER })
    rate: number;

    @Column({ type: DataType.INTEGER })
    totalPayment: number;

    @Column({ type: DataType.FLOAT })
    longDistance: number;

    @Column({ type: DataType.BOOLEAN })
    paymentStatus: boolean;

    @Column({ type: DataType.STRING })
    originAddress: string;

    @Column({ type: DataType.DOUBLE })
    originlongitude: number;

    @Column({ type: DataType.DOUBLE })
    originLatitude: number;

    @Column({ type: DataType.DOUBLE })
    destinationLatitude: number;

    @Column({ type: DataType.DOUBLE })
    destinationLongitude: number;

    @Column({ type: DataType.STRING })
    destinationAddress: string;

    @HasMany(() => Image)
    vehicleReceiptImage?: Image[];

    @BelongsTo(() => User, "customerId")
    customer: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT })
    customerId: number;

    @BelongsTo(() => User, "driverId")
    driver: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT })
    driverId: number;

    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;

    @BelongsTo(() => Promotion)
    promotion: Promotion;

    @ForeignKey(() => Promotion)
    @Column({ type: DataType.BIGINT })
    promotionId: number;

    @BelongsTo(() => UnitPrice)
    unitPrice: UnitPrice;

    @ForeignKey(() => UnitPrice)
    @Column({ type: DataType.BIGINT })
    unitPriceId: number;
}
