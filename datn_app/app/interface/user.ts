export interface IUser {
    id: number;
    email?: string;

    activated?: boolean;

    password?: string;

    fullName?: string;

    gender?: boolean;

    phone?: string;

    dob?: Date;

    avatar?: string;

    wardId?: number;

    roleName?: string;

    fcmId?: string;

    statusDriver?: string;
}
