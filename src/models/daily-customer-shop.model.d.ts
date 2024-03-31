import { Model } from "sequelize";
export default class DailyCustomerShop extends Model {
    id: string;
    productId: string;
    codeTransaction: number;
    quantity: number;
    totalPrice: number;
    dailyNoteId: string;
    createdBy?: string;
    createdDt?: Date;
    updatedBy?: string;
    updatedDt?: Date;
    deletedDt?: Date;
}
