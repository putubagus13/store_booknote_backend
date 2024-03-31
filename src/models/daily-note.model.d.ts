import { Model } from "sequelize";
export default class DailyNote extends Model {
    id: string;
    totalDailyCustomerShop: string;
    totalShoping: number;
    modal: number;
    saldo: number;
    storeId: string;
    createdBy?: string;
    createdDt?: Date;
    updatedBy?: string;
    updatedDt?: Date;
    deletedDt?: Date;
}
