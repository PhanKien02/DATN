/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import Districts from "./districts.entity";

/**
 * A Provinces.
 */
@Table({
    timestamps: false,
})
export default class Provinces extends Model {
    @PrimaryKey
    @Column({ type: DataType.CHAR })
    id?: string;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    type: string;

    @Column({ type: DataType.STRING })
    slug: string;

    @HasMany(() => Districts, "provinceId")
    districts: Districts[];
}
