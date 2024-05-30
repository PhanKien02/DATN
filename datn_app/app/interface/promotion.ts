export interface IPromotion {
    id: number;
    programName: string;
    amount: string;
    percent: number;
    startDate: string;
    expDate: string;
    conditionPrice: number;
    status: boolean;
}
