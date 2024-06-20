interface IRole {
    id: number;
    description: number;
    name: string;
}
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

    role?: IRole;

    fcmId?: string;

    statusDriver?: string;
    roleName?: string;
}
