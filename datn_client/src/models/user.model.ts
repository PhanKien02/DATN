export interface IUser {
     id: number;
     fullName?: string;
     email: string;
     phone?: string;
     dob?: string;
     activated?: boolean;
     gender?: boolean;
     imageUrl?: string;
     wardId?: string;
     districtId?: string;
     provinceId?: string;
     role: string;
}

export type LoginResponse = {
     token: {
          token: string;
          expiresAt: number;
     };
     refreshToken: string;
     user: IUser;
     exp: number;
};

export type LoginPayLoad = {
     password: string;
     fcmId: string;
     email: string;
};
