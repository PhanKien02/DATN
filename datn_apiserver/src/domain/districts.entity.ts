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
import Wards from "./wards.entity";
import Provinces from "./provinces.entity";

/**
 * A Districts.
 */
@Table({
    timestamps: false,
})
export default class Districts extends Model {
    @PrimaryKey
    @Column({ type: DataType.CHAR })
    id?: string;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    type: string;

    @HasMany(() => Wards)
    wards: Wards[];

    @BelongsTo(() => Provinces)
    province: Provinces;

    @ForeignKey(() => Provinces)
    @Column({ type: DataType.CHAR })
    provinceId: string;
}
