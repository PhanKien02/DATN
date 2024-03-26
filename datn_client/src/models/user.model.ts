export interface IUser {
     login: string;
     firstName?: string;
     lastName?: string;
     email: string;
     activated?: boolean;
     langKey?: string;
     authorities?: string[];
     password: string;
     imageUrl?: string;
     activationKey?: string;
     resetKey?: string;
     resetDate?: Date;
}