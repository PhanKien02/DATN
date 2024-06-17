import {
    AutoIncrement,
    BeforeCreate,
    BeforeUpdate,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from "sequelize-typescript";
import getHashPassword from "../utils/getHashPassword";
import Authority from "./authority.entity";
import Notification from "./notification.entity";
import Booking from "./booking.entity";
import Wards from "./wards.entity";
import Income from "./income.entity";
import RouteDriver from "./routeDriver.entity";

@Table
export default class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Unique
    @Column({
        type: DataType.STRING,
    })
    email?: string;

    @Unique
    @Column({
        type: DataType.STRING,
    })
    phone?: string;

    @Column({ type: DataType.BOOLEAN })
    activated?: boolean;

    @Column({ type: DataType.STRING })
    password?: string;

    @Column({ type: DataType.STRING })
    fullName?: string;

    @Column({ type: DataType.BOOLEAN })
    gender?: boolean;

    @Column({ type: DataType.DATE })
    dob?: Date;

    @Column({ type: DataType.STRING })
    statusDriver: string;

    @Column({ type: DataType.STRING })
    avatar?: string;

    @Column({ type: DataType.STRING })
    fcmId?: string;

    @Column({ type: DataType.STRING })
    activeKey: string;

    @BelongsTo(() => Wards)
    ward: Wards;

    @ForeignKey(() => Wards)
    @Column({ type: DataType.CHAR })
    wardId?: string;

    @ForeignKey(() => Authority)
    @Column({ type: DataType.BIGINT })
    roleId?: number;

    @BelongsTo(() => Authority)
    role: Authority;

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

    @HasMany(() => Income)
    income: Income[];

    @HasMany(() => Booking, "customerId")
    customnerBooking: Booking[];

    @HasMany(() => Booking, "driverId")
    driverBooking: Booking[];

    @HasMany(() => RouteDriver)
    routeDriver: RouteDriver[];

    @HasMany(() => Notification, "receiverId")
    receiverNotification: Notification[];

    @HasMany(() => Notification, "senderId")
    senderNotification: Notification[];

    @BeforeUpdate
    @BeforeCreate
    static async hashPassword(instance: User) {
        instance.password = await getHashPassword(instance.password.trim());
    }
    @BeforeUpdate
    @BeforeCreate
    static async toLowerCaseEmail(instance: User) {
        instance.email = instance.email.toLowerCase().trim();
    }
}
