/* eslint-disable @typescript-eslint/no-unused-vars */
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
import Districts from "./districts.entity";
import User from "./user.entity";

/**
 * A Provinces.
 */
@Table({
    timestamps: false,
})
export default class RouteDriver extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.DOUBLE })
    lat: number;

    @Column({ type: DataType.DOUBLE })
    long: number;

    @Column({ type: DataType.DATE })
    time: Date;

    @BelongsTo(() => User)
    driver: User;

    @ForeignKey(() => User)
    driverId: number;
}
