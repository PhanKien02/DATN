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
 * A Wards.
 */
@Table({
    timestamps: false,
})
export default class Wards extends Model {
    @PrimaryKey
    @Column({ type: DataType.CHAR })
    id?: string;

    @Column({ type: DataType.STRING })
    name?: string;

    @Column({ type: DataType.STRING })
    type?: string;

    @HasMany(() => User)
    users?: User[];

    @BelongsTo(() => Districts)
    district?: Districts;

    @ForeignKey(() => Districts)
    @Column({ type: DataType.CHAR })
    districtId?: string;
}
