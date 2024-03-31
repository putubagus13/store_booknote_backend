import { Model } from "sequelize";
export default class Shoping extends Model {
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
