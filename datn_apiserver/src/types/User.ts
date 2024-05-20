import { IUser } from "../interface/IUser";

export interface UserPayLoad {
    id?: number;

    email?: string;

    activated?: boolean;

    password?: string;

    fullName?: string;

    gender?: boolean;

    phone?: string;

    dob?: Date;

    avatar?: string;

    wardId?: string;

    roleName?: string;
}
export interface UserResponse {
    users: IUser[];
    limit: number;
    page: number;
    totalPage: number;
}
export interface Login {
    email: string;
    password: string;
}
